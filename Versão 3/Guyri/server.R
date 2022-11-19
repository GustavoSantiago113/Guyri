# Importando Bibliotecas ####
library(shiny)
library(shinyjs)
  
  # Server ####
shinyServer(function(input, output, session) {
  
  # Analise Economica ####
  observeEvent(input$calcAnaEco, {
    shinyjs::show(id = "boxAnaEco")
  })

})


