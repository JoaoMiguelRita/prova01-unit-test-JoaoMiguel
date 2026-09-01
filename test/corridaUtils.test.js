const CorridaUtils = require('../src/corridaUtils.js');

describe('Testes da classe CorridaUtils', () => {
    let corridaUtils;

    beforeEach(() => {
        corridaUtils = new CorridaUtils();
    });

    test('Deve calcular a taxa de desaceleração do veículo', () => {
        // Arrange
        const velocidadeInicial = 100;
        const velocidadeFinal = 50;
        const tempo = 10;

        // Act & Assert
        expect(corridaUtils.calcularDesaceleracao(velocidadeInicial, velocidadeFinal, tempo)).toBe(5);
    });

    test('Deve verificar se o piloto excedeu o limite de velocidade no pitlane', () => {
        const velocidadeOk = 75;
        const velocidadeInvalida = -1;
        const velocidadePenalidade = 85;

        expect(corridaUtils.verificarExcessoNoPitlane(velocidadeOk)).toBe("Velocidade OK");
        expect(corridaUtils.verificarExcessoNoPitlane(velocidadePenalidade)).toBe("Penalidade: Drive-through");
        expect(() => {corridaUtils.verificarExcessoNoPitlane(velocidadeInvalida)}).toThrow("Velocidade inválida");
    });

    test('Deve exibir o tempo de vantagem de um perseguidor em relação ao seu líder', () => {
        const tempoLider = 100.123456;
        const tempoPerseguidor = 120.98765;
        const tempoInvalido = 80;
        const tempoZerado = 0;

        expect(corridaUtils.calcularTempoDeVantagem(tempoLider, tempoPerseguidor)).toBe(20.864);
        expect(() => {corridaUtils.calcularTempoDeVantagem(tempoLider, tempoInvalido)}).toThrow("O tempo do líder deve ser menor");
        expect(() => {corridaUtils.calcularTempoDeVantagem(tempoZerado, tempoPerseguidor)}).toThrow("Tempos devem ser positivos");
        expect(() => {corridaUtils.calcularTempoDeVantagem(tempoLider, tempoZerado)}).toThrow("Tempos devem ser positivos");
    });

    test('Deve verificar se o piloto está qualificado para a corrida diante da regra de 107%', () => {
        const tempoDoPiloto = 100.123456;
        const tempoDaPolePositionNaoQualificado = 90.98765;
        const tempoDaPolePositionQualificado = 100.98765;
        const tempoInvalido = 0;

        expect(corridaUtils.verificarRegra107Porcento(tempoDoPiloto, tempoDaPolePositionNaoQualificado)).toBe(false);
        expect(corridaUtils.verificarRegra107Porcento(tempoDoPiloto, tempoDaPolePositionQualificado)).toBe(true);
        expect(() => {corridaUtils.verificarRegra107Porcento(tempoInvalido, tempoInvalido)}).toThrow("Tempos inválidos");
        expect(() => {corridaUtils.verificarRegra107Porcento(tempoDoPiloto, tempoInvalido)}).toThrow("Tempos inválidos");
    });

    test('Deve retornar o desgaste do pneu', () => {
        const VinteCincovoltas = 25;
        const TrintaCincoVoltas = 35;
        const CinquentaVoltas = 50;
        const SetentaCincoVoltas = 75;
        const MenosUmaVolta = -1;

        const tipoPneu = ["Macio", "Medio", "Duro", "Careca"];

        expect(corridaUtils.calcularDesgasteDoPneu(VinteCincovoltas, tipoPneu[0])).toBe(87.5);
        expect(corridaUtils.calcularDesgasteDoPneu(CinquentaVoltas, tipoPneu[0])).toBe(100);

        expect(corridaUtils.calcularDesgasteDoPneu(TrintaCincoVoltas, tipoPneu[1])).toBe(70);
        expect(corridaUtils.calcularDesgasteDoPneu(SetentaCincoVoltas, tipoPneu[1])).toBe(100);

        expect(corridaUtils.calcularDesgasteDoPneu(CinquentaVoltas, tipoPneu[2])).toBe(60);
        expect(corridaUtils.calcularDesgasteDoPneu(SetentaCincoVoltas, tipoPneu[2])).toBe(90);
        expect(() => {corridaUtils.calcularDesgasteDoPneu(MenosUmaVolta, tipoPneu[0])}).toThrow("Número de voltas inválido");
        expect(() => {corridaUtils.calcularDesgasteDoPneu(VinteCincovoltas, tipoPneu[3])}).toThrow("Tipo de pneu desconhecido");
    });

    test('Deve verificar se o pit stop é recomendado', () => {
        const desgasteAlto = 85;
        const voltasPneuAlto = 50;
        const chuvaForte = false;
        const desgasteMedio = 50;
        const voltasPneuBaixo = 5;
        const desgasteLeve = 55;
        const voltasPneuMedio = 30;
        const chuvaLeve = true;
        const desgasteIdeal = 40;
        const voltasPneuAlto2 = 40;
        const chuvaFalsa = false;
        const desgasteInvalido = -5;
        const voltasPneuPadrao = 30;

        expect(corridaUtils.verificarPitStopRecomendado(desgasteAlto, voltasPneuAlto, chuvaForte)).toBe(true);
        expect(corridaUtils.verificarPitStopRecomendado(desgasteMedio, voltasPneuBaixo, chuvaFalsa)).toBe(true);
        expect(corridaUtils.verificarPitStopRecomendado(desgasteLeve, voltasPneuMedio, chuvaLeve)).toBe(true);
        expect(corridaUtils.verificarPitStopRecomendado(desgasteIdeal, voltasPneuAlto2, chuvaFalsa)).toBe(false);
        expect(() => corridaUtils.verificarPitStopRecomendado(desgasteInvalido, voltasPneuPadrao, chuvaFalsa)).toThrow("Desgaste deve ser entre 0 e 100");
    });

    test('Deve calcular o consumo de combustível baseado no tipo de motor', () => {
        const distanciaPadrao = 100;
        const motorV8 = "V8";
        const motorV6 = "V6";
        const motorEletrico = "Eletrico";
        const motorInvalido = "Invalido";

        expect(corridaUtils.calcularConsumo(distanciaPadrao, motorV8)).toBe(50);
        expect(corridaUtils.calcularConsumo(distanciaPadrao, motorV6)).toBe(30);
        expect(corridaUtils.calcularConsumo(distanciaPadrao, motorEletrico)).toBe(10);
        expect(() => corridaUtils.calcularConsumo(distanciaPadrao, motorInvalido)).toThrow("Tipo de motor não suportado");
    });

    test('Deve verificar desclassificação por excesso de faltas', () => {
        const faltasBaixas = 2;
        const faltasLimite = 3;
        const faltasAltas = 5;
        const faltasNegativas = -1;

        expect(corridaUtils.verificarDesclassificacaoPorFaltas(faltasBaixas)).toBe(false);
        expect(corridaUtils.verificarDesclassificacaoPorFaltas(faltasLimite)).toBe(true);
        expect(corridaUtils.verificarDesclassificacaoPorFaltas(faltasAltas)).toBe(true);
        expect(() => corridaUtils.verificarDesclassificacaoPorFaltas(faltasNegativas)).toThrow("Penalidades não podem ser negativas");
    });

    test('Deve calcular a taxa de ocupação das arquibancadas', () => {
        const publicoNormal = 5000;
        const capacidadeNormal = 10000;
        const publicoNegativo = -100;
        const capacidadeInvalida = 1000;
        const publicoExcedente = 1200;
        const capacidadeMaxima = 1000;

        expect(corridaUtils.calcularTaxaDeOcupacao(publicoNormal, capacidadeNormal)).toBe(50);
        expect(() => corridaUtils.calcularTaxaDeOcupacao(publicoNegativo, capacidadeInvalida)).toThrow("Valores de público ou capacidade inválidos");
        expect(() => corridaUtils.calcularTaxaDeOcupacao(publicoExcedente, capacidadeMaxima)).toThrow("O público presente não pode ser maior que a capacidade máxima");
    });

    test('Deve calcular a velocidade média em km/h', () => {
        const distanciaNormal = 200;
        const tempoNormal = 2;
        const tempoZero = 0;
        const distanciaNegativa = -50;
        const tempoUm = 1;

        expect(corridaUtils.calcularVelocidadeMedia(distanciaNormal, tempoNormal)).toBe(100);
        expect(() => corridaUtils.calcularVelocidadeMedia(distanciaNormal, tempoZero)).toThrow("O tempo deve ser positivo");
        expect(() => corridaUtils.calcularVelocidadeMedia(distanciaNegativa, tempoUm)).toThrow("A distância não pode ser negativa");
    });

    test('Deve estimar o combustível necessário para terminar a corrida', () => {
        const voltasNormais = 10;
        const consumoPorVolta = 2;
        const fatorSeguranca = 1.1;
        const voltasZero = 0;
        const voltasNegativas = -5;

        expect(corridaUtils.estimarCombustivelNecessario(voltasNormais, consumoPorVolta, fatorSeguranca)).toBe(22);
        expect(corridaUtils.estimarCombustivelNecessario(voltasZero, consumoPorVolta)).toBe(0);
        expect(corridaUtils.estimarCombustivelNecessario(voltasNegativas, consumoPorVolta)).toBe(0);
    });

    test('Deve aplicar boost de nitro respeitando o limite do motor', () => {
        const velocidadeAtual = 200;
        const limiteMotor = 300;
        const boostNitro = 50;
        const velocidadeAlta = 280;

        expect(corridaUtils.aplicarBoostDeNitro(velocidadeAtual, limiteMotor, boostNitro)).toBe(250);
        expect(corridaUtils.aplicarBoostDeNitro(velocidadeAlta, limiteMotor, boostNitro)).toBe(300);
    });

    test('Deve calcular o dano recebido em uma batida', () => {
        const impactoModerado = 100;
        const resistenciaMedia = 50;
        const impactoLeve = 20;
        const resistenciaAlta = 100;
        const impactoPadrao = 50;
        const resistenciaZero = 0;

        expect(corridaUtils.calcularDanoDeBatida(impactoModerado, resistenciaMedia)).toBe(150);
        expect(corridaUtils.calcularDanoDeBatida(impactoLeve, resistenciaAlta)).toBe(0);
        expect(() => corridaUtils.calcularDanoDeBatida(impactoPadrao, resistenciaZero)).toThrow("A resistência deve ser maior que zero");
    });

    test('Deve calcular o saldo de posições ganhas ou perdidas', () => {
        const posicaoLargada1 = 10;
        const posicaoChegada1 = 5;
        const posicaoLargada2 = 5;
        const posicaoChegada2 = 10;
        const posicaoZero = 0;
        const posicaoValida = 5;

        expect(corridaUtils.calcularPosicoesGanhas(posicaoLargada1, posicaoChegada1)).toBe(5);
        expect(corridaUtils.calcularPosicoesGanhas(posicaoLargada2, posicaoChegada2)).toBe(-5);
        expect(() => corridaUtils.calcularPosicoesGanhas(posicaoZero, posicaoValida)).toThrow("Posições devem ser maiores que zero");
    });

    test('Deve calcular a pontuação baseada na posição e volta mais rápida', () => {
        const primeiraPosicao = 1;
        const temVoltaMaisRapida = true;
        const semVoltaMaisRapida = false;
        const posicaoForaDosPontos = 11;
        const posicaoInvalida = 0;

        expect(corridaUtils.calcularPontuacao(primeiraPosicao, temVoltaMaisRapida)).toBe(26);
        expect(corridaUtils.calcularPontuacao(primeiraPosicao, semVoltaMaisRapida)).toBe(25);
        expect(corridaUtils.calcularPontuacao(posicaoForaDosPontos, temVoltaMaisRapida)).toBe(0);
        expect(() => corridaUtils.calcularPontuacao(posicaoInvalida, temVoltaMaisRapida)).toThrow("Posição inválida");
    });

    test('Deve converter velocidade entre KM/H e MPH', () => {
        const velocidadeBase = 100;
        const unidadeMph = "MPH";
        const unidadeKmh = "KMH";
        const velocidadeNegativa = -10;
        const unidadeInvalida = "INVALIDA";

        expect(corridaUtils.converterVelocidade(velocidadeBase, unidadeMph)).toBe(62.14);
        expect(corridaUtils.converterVelocidade(velocidadeBase, unidadeKmh)).toBe(160.93);
        expect(() => corridaUtils.converterVelocidade(velocidadeNegativa, unidadeMph)).toThrow("Velocidade não pode ser negativa");
        expect(() => corridaUtils.converterVelocidade(velocidadeBase, unidadeInvalida)).toThrow("Unidade de destino inválida");
    });

    test('Deve calcular a distância de frenagem', () => {
        const velocidadeFrenagem = 20;
        const coeficienteAtrito = 0.7;
        const coeficienteZero = 0;

        expect(corridaUtils.calcularDistanciaDeFrenagem(velocidadeFrenagem, coeficienteAtrito)).toBe(29.12);
        expect(() => corridaUtils.calcularDistanciaDeFrenagem(velocidadeFrenagem, coeficienteZero)).toThrow("Coeficiente de atrito inválido");
    });

    test('Deve verificar se o piloto pode ativar a Asa Móvel (DRS)', () => {
        const distanciaDrsValida = 0.8;
        const drsDisponivel = true;
        const distanciaDrsLonge = 1.5;
        const distanciaDrsPerto = 0.5;
        const drsIndisponivel = false;
        const distanciaInvalida = -1;

        expect(corridaUtils.podeAtivarDRS(distanciaDrsValida, drsDisponivel)).toBe(true);
        expect(corridaUtils.podeAtivarDRS(distanciaDrsLonge, drsDisponivel)).toBe(false);
        expect(corridaUtils.podeAtivarDRS(distanciaDrsPerto, drsIndisponivel)).toBe(false);
        expect(() => corridaUtils.podeAtivarDRS(distanciaInvalida, drsDisponivel)).toThrow("Distância inválida");
    });

    test('Deve verificar se a corrida já terminou', () => {
        const voltasAtuaisFim = 50;
        const totalVoltas = 50;
        const voltasAtuaisAndamento = 45;
        const voltasInvalidas = -1;

        expect(corridaUtils.verificarFimDeProva(voltasAtuaisFim, totalVoltas)).toBe(true);
        expect(corridaUtils.verificarFimDeProva(voltasAtuaisAndamento, totalVoltas)).toBe(false);
        expect(() => corridaUtils.verificarFimDeProva(voltasInvalidas, totalVoltas)).toThrow("Valores inválidos");
    });

    test('Deve analisar o desempenho de um corredor', () => {
        const posicaoVencedor = 1;
        const ganhoPosicaoZero = 0;
        const posicaoPodio = 3;
        const ganhoPosicaoUm = 1;
        const posicaoRecuperacao = 8;
        const ganhoPosicaoAlto = 6;
        const posicaoRuim = 10;
        const perdaPosicao = -2;
        const posicaoRegular = 6;

        expect(corridaUtils.analisarDesempenho(posicaoVencedor, ganhoPosicaoZero)).toBe("Vitória dominante");
        expect(corridaUtils.analisarDesempenho(posicaoPodio, ganhoPosicaoUm)).toBe("Pódio garantido");
        expect(corridaUtils.analisarDesempenho(posicaoRecuperacao, ganhoPosicaoAlto)).toBe("Ótima corrida de recuperação");
        expect(corridaUtils.analisarDesempenho(posicaoRuim, perdaPosicao)).toBe("Desempenho abaixo do esperado");
        expect(corridaUtils.analisarDesempenho(posicaoRegular, ganhoPosicaoUm)).toBe("Corrida regular");
    });
});