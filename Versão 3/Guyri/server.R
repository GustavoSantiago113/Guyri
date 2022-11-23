# Importando Bibliotecas ####
library(shiny)
library(shinyjs)

# Analise Economica ####
analiseEconomica <- function (Vi, Ve, Td, Go, Rla){
  
  paySimples <- Vi/Vo
  
  
  vectorPaySimples <- c()
  controlPaySimples <- Vi;
  vectorPaySimples <- append(vectorPaySimples, controlPaySimples)
  for(i in round(paySimples)){
    controlPaySimples = controlPaySimples - Vo;
    vectorPaySimples <- append(vectorPaySimples, controlPaySimples);
  }
  
  Von = Vo / (1 + (Td/100));
  payDesco = Vi / Von;
  
  
  
}

  # Server ####
shinyServer(function(input, output, session) {
  
  # Analise Economica ####
  observeEvent(input$calcAnaEco, {
    shinyjs::show(id = "boxAnaEco")
  })

})


