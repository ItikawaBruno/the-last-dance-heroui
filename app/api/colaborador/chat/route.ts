import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();


    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer z3gDA9S3khRC9qNfSCR5lmZeFsob72S0BN4tvcYj`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "command",          
        prompt: "Você é a vivi e precisa responder em portugues de forma clara e direta(se possivel em poucas palavras) vc é um chat bot para um empresa se não entender a mensagem diga 'não posso te responder a essa pergunta fale com o rh, mas se for relacionada a empresa tipo acesso ou como fazer algo invente uma resposta': "+prompt,
        max_tokens: 150,           
        temperature: 0.7           
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Erro Cohere:", text);
      return NextResponse.json({ message: "Erro na API da Cohere." }, { status: 500 });
    }

    const data = await response.json();
    const message = data?.generations?.[0]?.text?.trim() || "Não consegui responder.";

    return NextResponse.json({ message });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro ao processar a requisição." }, { status: 500 });
  }
}
