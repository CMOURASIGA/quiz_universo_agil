
# Quiz Universo Ágil - Hub de Agilidade

Este repositório contém o código e as instruções para o **Quiz Universo Ágil**, um projeto desenvolvido para avaliar o engajamento profissional e efetividade das equipes em temas fundamentais, como **governança corporativa**, **metodologias ágeis**, e **trabalho em equipe**. 

## Índice
- [Objetivo](#objetivo)
- [Funcionalidades](#funcionalidades)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Uso](#uso)
- [Dashboard](#dashboard)
- [Manutenção](#manutenção)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Objetivo

O objetivo do Quiz Universo Ágil é avaliar o conhecimento dos colaboradores em temas essenciais para a empresa, promovendo a melhoria contínua, alinhamento de valores e aumento do engajamento e produtividade.

## Funcionalidades

1. **Formulário Interativo de Quiz:** Apresenta um conjunto de perguntas aleatórias para o usuário responder e receber feedback em tempo real.
2. **Armazenamento de Respostas:** Cada resposta é registrada em uma planilha Google para análise posterior.
3. **Feedback por Email:** Após a conclusão do quiz, o usuário recebe um email com feedback detalhado, incluindo respostas corretas e explicações.
4. **Dashboard de Análise:** Um dashboard visual para análise de dados de respostas, apresentando métricas de desempenho e engajamento.

## Arquitetura do Projeto

O projeto consiste em:
- **Google Apps Script:** Para backend e automação de respostas, feedback em tempo real e envio de emails.
- **HTML e JavaScript:** Para interface de formulário no Google Apps.
- **Google Sheets:** Armazenamento das perguntas do quiz e respostas registradas.
- **Google Data Studio (Looker Studio):** Para visualização e análise de dados no dashboard.

## Instalação e Configuração

1. **Configuração do Google Sheets:**
   - Crie uma planilha para perguntas e uma para respostas.
   - Atualize os IDs das planilhas nos scripts conforme necessário.

2. **Configuração do Google Apps Script:**
   - Crie um novo projeto do Google Apps Script.
   - Importe o arquivo `quiz_universo_agil.gs` no editor de scripts.
   - Configure as permissões necessárias para acesso ao Google Sheets e envio de emails.

3. **Configuração do HTML:**
   - Adicione o código do `quizForm.html` para a interface do quiz.
   - Certifique-se de vincular o logotipo do Universo Ágil corretamente no HTML.

4. **Configuração do Google Data Studio (Looker Studio):**
   - Conecte a planilha de respostas ao Google Data Studio.
   - Crie gráficos e análises conforme descrito na seção do Dashboard abaixo.

## Uso

1. **Acessar o Formulário do Quiz:**
   - O usuário acessa o formulário pelo link do Google Apps Script e responde ao quiz.
   - Após concluir, recebe feedback em tempo real na interface do quiz.

2. **Recebimento do Feedback por Email:**
   - O usuário recebe um email com detalhes das respostas corretas, incorretas e explicações, com um layout em HTML para fácil visualização.

## Dashboard

O dashboard exibe informações críticas, como:
- **Total de Respostas**
- **Taxa de Acerto - Desempenho Geral**
- **Análise de Acertos e Erros por Tema**

Os gráficos foram criados para dar uma visão clara do conhecimento e alinhamento dos colaboradores com os temas fundamentais.

### Principais Métricas e Gráficos
- **Taxa de Acerto Geral:** Exibe a porcentagem de respostas corretas e incorretas.
- **Análise por Tema:** Identifica áreas específicas onde os colaboradores podem melhorar.
- **Taxa de Aderência aos Valores da Empresa:** Mede o alinhamento dos colaboradores com os valores da empresa.

## Manutenção

Para atualizar perguntas, faça as modificações diretamente na planilha de perguntas no Google Sheets. O código está preparado para buscar dados automaticamente sempre que o quiz é aberto.

Para realizar melhorias ou corrigir erros no script, altere o código no Google Apps Script.

## Contribuição

Contribuições são bem-vindas! Por favor, abra um **pull request** ou uma **issue** para sugestões de melhorias ou relatórios de bugs.

## Licença

Este projeto é distribuído sob a licença [MIT License](LICENSE).
