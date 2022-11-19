# Importing libraries ####
library(shiny)
library(shinydashboard)

# Creating the header ####
header <- dashboardHeader(title = "Guyri",
                          tags$li(class = "dropdown",
                                  tags$img(height = "20px", alt="Logo", src="logo.png"))
                          )

# Creating the sidebar ####
sidebar <- dashboardSidebar(
  sidebarMenu(
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
  # Including the CSS file
  tags$head(
            tags$link(rel= "stylesheet", type= "text/css", href="styles.css")),
  fluidRow(
    box(
      h1("Seja bem vindo a Guyri!"),
      h5("Ela e sua plataforma de dimensionamento.
       Escolha o que deseja dimensionar no menu ao lado e bom trabalho!")
    )
  )
)

# UI - Gathering everything ####
shinyUI(dashboardPage(header, sidebar, body))
