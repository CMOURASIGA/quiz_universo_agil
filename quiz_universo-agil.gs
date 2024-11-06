// Links e IDs das planilhas e pastas
var PLANILHA_QUIZ_ID = "1KalJM6MPSCcMxFOnFd8CSX5Kgyr9Jinw3ZQzg_HhlGM"; // ID da planilha de perguntas 
var PLANILHA_RESPOSTAS_ID = "1Zdo0kEcb_NMnuOfjcS8v9ftfUZfRFvWI_sDeNyaUtks"; // ID da planilha de respostas

// Função para renderizar a interface HTML
function doGet() {
  return HtmlService.createHtmlOutputFromFile('quizForm')
      .setTitle("Quiz Universo Ágil - Hub de Agilidade");
}

// Função para buscar perguntas aleatórias
function getRandomQuestions() {
  var sheet = SpreadsheetApp.openById(PLANILHA_QUIZ_ID).getSheetByName("Quiz");
  var numeroMaxPerguntas = sheet.getLastRow() - 1; // Ignora a primeira linha de cabeçalho
  var numeroPerguntas = 5; // Número de perguntas a selecionar

  var perguntas = [];
  var linhasSelecionadas = [];
  while (perguntas.length < numeroPerguntas) {
    var linhaAleatoria = Math.floor(Math.random() * numeroMaxPerguntas) + 2; // Linha 2 em diante
    if (linhasSelecionadas.indexOf(linhaAleatoria) === -1) {
      linhasSelecionadas.push(linhaAleatoria);

      var assunto = sheet.getRange(linhaAleatoria, 1).getValue(); // Coluna A, Assunto
      var pergunta = sheet.getRange(linhaAleatoria, 2).getValue(); // Coluna B, Pergunta
      var opcoes = [
        sheet.getRange(linhaAleatoria, 3).getValue(), // Coluna C
        sheet.getRange(linhaAleatoria, 4).getValue(), // Coluna D
        sheet.getRange(linhaAleatoria, 5).getValue()  // Coluna E
      ];
      var respostaCorreta = sheet.getRange(linhaAleatoria, 6).getValue(); // Coluna F
      var explicacao = sheet.getRange(linhaAleatoria, 7).getValue(); // Coluna G

      perguntas.push({
        linha: linhaAleatoria, // Adiciona o número da linha original
        assunto: assunto,
        pergunta: pergunta,
        opcoes: opcoes,
        correta: respostaCorreta,
        explicacao: explicacao
      });
    }
  }
  return perguntas;
}


// Função para salvar respostas e retornar feedback
function submitAnswers(respostas, email) {
  var sheetRespostas = SpreadsheetApp.openById(PLANILHA_RESPOSTAS_ID).getActiveSheet();
  var sheetPerguntas = SpreadsheetApp.openById(PLANILHA_QUIZ_ID).getSheetByName("Quiz");
  var data = new Date();
  var feedback = [];

  respostas.forEach(function(resposta) {
    var linhaPergunta = resposta.linha; // Usa o número da linha original
    var respostaCorreta = sheetPerguntas.getRange(linhaPergunta, 6).getValue().toString().trim(); // Coluna F - Resposta Correta
    var explicacao = sheetPerguntas.getRange(linhaPergunta, 7).getValue(); // Coluna G - Explicação
    var correto = respostaCorreta === resposta.respostaDada;

    // Adiciona ao feedback para retorno em tempo real
    feedback.push({
      pergunta: resposta.pergunta,
      respostaDada: resposta.respostaDada,
      correta: correto,
      respostaCorreta: respostaCorreta,
      explicacao: explicacao
    });

    // Registra a resposta na planilha de respostas
    sheetRespostas.appendRow([
      email,
      resposta.pergunta,
      resposta.respostaDada,
      resposta.assunto,
      correto ? "Correto" : "Errado",
      Utilities.formatDate(data, Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss")
    ]);
  });

  // Envia o feedback por email
  enviarEmailFeedback(email, feedback);

  return feedback; // Retorna o feedback para exibir em tempo real
}





// Função para enviar o feedback por email
function enviarEmailFeedback(email, respostas) {
  var feedbackHTML = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #1C4587;">Feedback do Quiz Universo Ágil - Hub de Agilidade</h2>
      <div style="background-color: #FAE8B0; padding: 15px; border-radius: 5px;">
  `;

  respostas.forEach(function(resposta) {
    feedbackHTML += `
      <div style="margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
        <p><strong>Pergunta:</strong> ${resposta.pergunta}</p>
        <p><strong>Sua Resposta:</strong> ${resposta.respostaDada}</p>
        <p><strong>Correto:</strong> ${resposta.correta ? "Sim" : "Não"}</p>
    `;

    if (!resposta.correta) {
      feedbackHTML += `
        <p><strong>Resposta Correta:</strong> ${resposta.respostaCorreta}</p>
        <p><strong>Explicação:</strong> ${resposta.explicacao}</p>
      `;
    }
    feedbackHTML += `</div>`;
  });

  feedbackHTML += `
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: email,
    subject: "Feedback do Quiz Universo Ágil - Hub de Agilidade",
    htmlBody: feedbackHTML,
    name: "Leo Ibanhes <leoibanhes@gmail.com> - Universo Ágil"
  });
}
