# Agenda PWA — Assembleia de Deus, Ministério do Belém - Camargo 3

Site responsivo em português, com identidade visual preta, dourada e branca, agenda de domingo a sábado, eventos especiais, compartilhamento e suporte PWA.

## Arquivos

- `index.html` — estrutura do site e painel administrativo.
- `styles.css` — visual responsivo para celular e computador.
- `app.js` — programação, edição, exportação e importação de backup.
- `manifest.webmanifest` — informações para instalação como aplicativo.
- `sw.js` — cache básico para abrir o site quando estiver sem conexão após a primeira visita.
- `icon.svg` — ícone do aplicativo.

## Importante sobre o painel administrativo

Esta versão inicial guarda as alterações no `localStorage` do navegador. Isso permite testar e administrar a agenda no mesmo aparelho/navegador, mas **não sincroniza** as mudanças para outros celulares ou computadores. Também não há autenticação real: não publique dados privados esperando que o painel seja protegido.

Para uma agenda compartilhada de verdade, o próximo passo é conectar um backend (por exemplo, Supabase ou Firebase), configurar login de administrador e regras de acesso. Assim, alterações feitas por um administrador aparecerão para todos os visitantes. Não coloque senhas ou chaves privadas no JavaScript público.

## Testar no computador

1. Extraia o ZIP.
2. Abra a pasta do projeto.
3. Para testar o PWA e o cache, sirva os arquivos por HTTP local. Com Python instalado, abra um terminal nessa pasta e execute:
   ```bash
   python -m http.server 8000
   ```
4. Acesse `http://localhost:8000`.

Abrir `index.html` diretamente funciona para testar a página, mas recursos PWA/service worker exigem `localhost` ou HTTPS.

## Publicar gratuitamente com GitHub Pages

1. Crie ou entre em uma conta no GitHub.
2. Crie um repositório, por exemplo `agenda-ad-camargo3`.
3. Envie os arquivos desta pasta para a raiz do repositório.
4. No repositório, abra **Settings → Pages**.
5. Em **Build and deployment**, escolha **Deploy from a branch**; selecione a branch `main` e a pasta `/ (root)`, depois salve.
6. Aguarde a publicação e abra o endereço indicado pelo GitHub Pages.
7. Teste em um celular Android usando Chrome. O site deve ser servido por HTTPS para instalação PWA.

## Como usar o painel

1. Abra a seção **Painel administrativo** e clique em **Abrir painel**.
2. Escolha “Atividade semanal” ou “Evento especial”.
3. Informe nome, dia/horário e descrição. Para eventos especiais, a data é opcional.
4. Clique em **Salvar atividade**.
5. Use **Editar** ou **Excluir** na lista de atividades.
6. Antes de limpar os dados do navegador ou trocar de aparelho, use **Exportar cópia de segurança (JSON)** e guarde o arquivo. O JSON pode ser importado neste mesmo site.

## Personalizar a programação

A programação inicial é apenas um exemplo para demonstrar o funcionamento. Revise todos os dias e horários antes de publicar. Você pode excluir os exemplos pelo painel e cadastrar os horários oficiais da igreja.

## Compartilhamento

O botão “Compartilhar agenda” usa o compartilhamento do dispositivo quando disponível; em outros navegadores tenta copiar o texto e link. O link só pode ser compartilhado depois que o site estiver publicado.

## Próxima etapa recomendada

Para uso real pela congregação, implemente autenticação administrativa e banco de dados compartilhado. A versão atual é um protótipo funcional de front-end, não um sistema multiusuário.
