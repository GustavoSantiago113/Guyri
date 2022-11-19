# Importando Bibliotecas ####
library(shiny)
library(shinydashboard)
library(plotly)

# Analise Economica ####
analiseEconomica <- conditionalPanel(
  condition = "input.menu == 'anaEco'",
  tabsetPanel(
    id = "tabsetAnaEco",
    tabPanel(
      title = "Inputs",
      numericInput(
        inputId = "Vi",
        label = h6("Valor Investido total"),
        value = 0
      ),
      numericInput(
        inputId = "Ve",
        label = h6("Valor economizado por mes"),
        value = 0
      ),
      numericInput(
        inputId = "Td",
        label = h6("Taxa minima de atratividade"),
        value = 0
      ),
      numericInput(
        inputId = "Go",
        label = h6("Ganho obtido"),
        value = 0
      ),
      numericInput(
        inputId = "Rla",
        label = h6("Resultado Liquido anual"),
        value = 0
      ),
      actionButton(
        inputId = "calcAnaEco",
        label = "Analisar"
      ),
      br(),
      br()
    )
  ),
  class = "flex-center"
)

analiseEconomicaOut <- shinyjs::hidden(
  div(
    id = "boxAnaEco", 
    
    box(
      title = "Resultados",
      h1("teste"),
      textOutput("paySimples"),
      textOutput("payDesco"),
      textOutput("retorSobInv"),
      textOutput("rentaAnua"),
      renderPlotly("anaEcoChart"),
      actionButton(
        inputId = "pdfAnaEco",
        label = "Gerar Relatorio"
      ),
      solidHeader = TRUE,
      collapsible = TRUE,
      collapsed = TRUE,
      status = "primary"
    )
  )
)

# Creating the header ####
header <- dashboardHeader(title = "Guyri",
                          tags$li(class = "dropdown",
                                  tags$img(height = "20px", alt="Logo", src="logo.png"))
                          )

# Creating the sidebar ####
sidebar <- dashboardSidebar(
  sidebarMenu(
    id = "menu",
    menuItem("Irrigacao", tabName = "irrigacao", icon = icon("droplet"),
             menuSubItem("Aspersao", tabName = "aspersao"),
             menuSubItem("Gotejamento", tabName = "gotejamento"),
             menuSubItem("Micro Aspersao", tabName = "microAsp"),
             menuSubItem("Pivo Central", tabName = "pivo")),
    menuItem("Energia", tabName = "energia", icon = icon("solar-panel"),
             menuSubItem("Aquecimento Solar", tabName = "aquecimento"),
             menuSubItem("Eolica", tabName = "eolica"),
             menuSubItem("Fotovoltaica", tabName = "fotovoltaica")),
    menuItem("Sistemas Biologicos", tabName = "sistBio", icon = icon("bacterium"),
             menuSubItem("Biodigestor", tabName = "biodigestor"),
             menuSubItem("Compostagem", tabName = "compostagem")),
    menuItem("Protegidos", tabName = "protegidos", icon = icon("fan"),
             menuSubItem("Ar Condicionado", tabName = "arCondi"),
             menuSubItem("Nebulizacao", tabName = "nebulizacao"),
             menuSubItem("Ventilacao Forcada", tabName = "ventForcada")),
    menuItem("Analise Economica", tabName = "anaEco", icon = icon("dollar-sign"))
  )
)

# Creating the body ####
body <- dashboardBody(
  
  useShinyjs(),
  # Including the CSS file
  tags$head(
            tags$link(rel= "stylesheet", type= "text/css", href="styles.css")),
  
  # Analise Economica ####
  analiseEconomica,
  analiseEconomicaOut
)

# UI - Gathering everything ####
shinyUI(dashboardPage(header, sidebar, body))


