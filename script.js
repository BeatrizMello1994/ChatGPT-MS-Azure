async function sendMessage() {
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const userMessage = userInput.value;
  
    if (!userMessage) return;
  
    // Adiciona mensagem do usuário
    const userDiv = document.createElement("div");
    userDiv.className = "user-message message";
    userDiv.textContent = userMessage;
    chatBox.appendChild(userDiv);
  
    // Limpa o campo de entrada
    userInput.value = "";
  
    // Faz scroll automático para a última mensagem
    chatBox.scrollTop = chatBox.scrollHeight;
  
    // Configurações do endpoint e chave da API
    const endpoint = "https://beatrizaiservice-resource.openai.azure.com";
    const apiKey = "5G2D7TeTsXY3F0Pfs0CNeUIlprjW910NaGjuz2qkwT5y0FAe9dNgJQQJ99BEACHYHv6XJ3w3AAAAACOGWlxp";
    const deploymentId = "gpt-4o"; // Nome do deployment no Azure OpenAI
    const apiVersion = "2025-01-01-preview"; // Verifique a versão na documentação
  
    // URL para a chamada da API
    const url = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;
    
    // Configurações do corpo da requisição
    const data = {
      messages: [{ role: "user", content: userMessage }],
      max_tokens: 50
    };
  
    // Cabeçalhos da requisição
    const headers = {
      "Content-Type": "application/json",
      "api-key": apiKey
    };
  
    try {
      // Faz a requisição com fetch
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const result = await response.json();
        const botMessage = result.choices[0].message.content;
  
        // Adiciona a resposta do bot
        const botDiv = document.createElement("div");
        botDiv.className = "bot-message message";
        botDiv.textContent = botMessage;
        chatBox.appendChild(botDiv);
  
        // Faz scroll automático para a última mensagem
        chatBox.scrollTop = chatBox.scrollHeight;
      } else {
        console.error("Erro na requisição:", response.status, response.statusText);
  
        const botDiv = document.createElement("div");
        botDiv.className = "bot-message message";
        botDiv.textContent = "Erro ao se comunicar com o serviço.";
        chatBox.appendChild(botDiv);
      }
    } catch (error) {
      console.error("Erro:", error);
  
      const botDiv = document.createElement("div");
      botDiv.className = "bot-message message";
      botDiv.textContent = "Erro ao se comunicar com o serviço.";
      chatBox.appendChild(botDiv);
    }
  }
  
  
  