/*
  ARQUIVO DE PROGRAMAÇÃO — EDITE ESTE ARQUIVO PARA ATUALIZAR O SITE.
  Mantenha a estrutura e as aspas. Horários no formato "HH:MM".
  Dia: 0=Domingo, 1=Segunda, 2=Terça, 3=Quarta, 4=Quinta, 5=Sexta, 6=Sábado.
  Para evento especial, preencha tipo:"special" e, se souber, data:"AAAA-MM-DD".
*/
window.PROGRAMACAO = {
  atividades: [
    { tipo:"weekly", titulo:"Escola Bíblica Dominical", dia:0, horario:"09:00", data:"", descricao:"Estudo da Palavra de Deus." },
    { tipo:"weekly", titulo:"Culto da Família", dia:0, horario:"18:00", data:"", descricao:"Culto de adoração e comunhão." },
    { tipo:"weekly", titulo:"Círculo de oração", dia:1, horario:"19:00", data:"", descricao:"Momento de oração e intercessão." },
    { tipo:"weekly", titulo:"Culto de ensino", dia:2, horario:"19:30", data:"", descricao:"Aprendizado e reflexão bíblica." },
    { tipo:"weekly", titulo:"Culto de ensino — Sede", dia:3, horario:"19:30", data:"", descricao:"Programação na sede." },
    { tipo:"weekly", titulo:"Culto do Propósito", dia:4, horario:"19:30", data:"", descricao:"Culto de oração e propósito." },
    { tipo:"weekly", titulo:"Ensaio do grupo de homens", dia:5, horario:"19:00", data:"", descricao:"Ensaio musical." },
    { tipo:"weekly", titulo:"Ensaio / atividades especiais", dia:6, horario:"15:00", data:"", descricao:"Confirme a atividade nos avisos da igreja." }

    /*
    EXEMPLO DE EVENTO ESPECIAL — remova os sinais de comentário e personalize:
    ,{ tipo:"special", titulo:"Congresso da igreja", dia:6, horario:"18:00", data:"2026-11-21", descricao:"Culto especial de celebração." }
    */
  ]
};