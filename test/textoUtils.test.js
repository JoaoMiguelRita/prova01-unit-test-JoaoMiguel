const TextoUtils = require("../src/textoUtils");

describe("texto utils", () => {
  test("deve inverter string", () => {
    // Arrange
    const textoUtils = new TextoUtils();

    // Act
    const textoInvertido = textoUtils.inverter("subi no onibus");
    // Assert
    expect(textoInvertido).toBe("subino on ibus");
  });

  test("Verifica se a string é um palindromo", () => {
    const textoUtils = new TextoUtils();
    const isPalindromo = textoUtils.ehPalindromo("radar")
    expect(isPalindromo).toBe(true);
  });

  test("Deve tornar a primeira letra maiuscula", () => {
    const textoUtils = new TextoUtils();
    const textoCapitalizado = textoUtils.capitalizar("eu sou bem legal")
    expect(textoCapitalizado).toBe("Eu Sou Bem Legal");
  });

  test("Deve contar quantas vezes um texto aparece em outro", () => {
    const textoUtils = new TextoUtils();
    const contagem = textoUtils.contarOcorrencias("Vai, vai, vai que eu também vou...", "vai")
    expect(contagem).toBe(2);
  });

  test("Deve remover espaços em branco", () => {
    const textoUtils = new TextoUtils();
    const textoSemEspaco = textoUtils.removerEspacosExtras(" Se essa    rua, se essa rua fosse minha, eu mandava ladrilhar ")
    expect(textoSemEspaco).toBe("Se essa rua, se essa rua fosse minha, eu mandava ladrilhar");
  });

  test("Deve converter string em slug", () => {
    const textoUtils = new TextoUtils();
    const textoSlugado = textoUtils.paraSlug(" O papa é pop")
    expect(textoSlugado).toBe("o-papa-e-pop");
  }); 

  test("Deve adicionar uma reticencias conforme tamanho de texto", () => {
    const textoUtils = new TextoUtils();
    const textoTruncado = textoUtils.truncar("Três pratos de tigro para três tigres tristes", 20)
    expect(textoTruncado).toBe("Três pratos de tigro...");
  });

  test("Deve retornar o número de palavras", () => {
    const textoUtils = new TextoUtils();
    const contagemDePalavras = textoUtils.contarPalavras("Num ninho de mafagafos há sete mafagafinhos. Quando a mafagafa gafa, gafam os sete mafagafinhos")
    expect(contagemDePalavras).toBe(15);
  });

  test("Deve verificar se o texto contém somente letras", () => {
    const textoUtils = new TextoUtils();
    const isOnlyLetras = textoUtils.somenteLetras("Havia 1 menininho torto, que morava em uma casa torta...")
    expect(isOnlyLetras).toBe(false);
  });

  test("Deve trocar um texto por um trecho de outro texto conforme indicado", () => {
    const textoUtils = new TextoUtils();
    const textoSubstituido = textoUtils.substituirTudo("O tempo perguntou ao tempo quanto tempo o tempo tem, o tempo respondeu ao tempo que o tempo tem o tempo que o tempo tem", "tempo", "camelo")
    expect(textoSubstituido).toBe("O camelo perguntou ao camelo quanto camelo o camelo tem, o camelo respondeu ao camelo que o camelo tem o camelo que o camelo tem");
  });
});