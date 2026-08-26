class CorridaUtils {
  
  /** 1. Calcula a taxa de desaceleração (frenagem) de um veículo */
  calcularDesaceleracao(velocidadeInicial, velocidadeFinal, tempo) {
    if (tempo <= 0) throw new Error("O tempo deve ser maior que zero");
    if (velocidadeFinal > velocidadeInicial) throw new Error("Velocidade final não pode ser maior que a inicial na frenagem");
    return (velocidadeInicial - velocidadeFinal) / tempo;
  }

  /** 2. Verifica se o piloto excedeu o limite de velocidade no pitlane (80 km/h) */
  verificarExcessoNoPitlane(velocidade) {
    if (velocidade < 0) throw new Error("Velocidade inválida");
    if (velocidade > 80) return "Penalidade: Drive-through";
    return "Velocidade OK";
  }

  /** 3. Calcula a desvantagem de tempo do perseguidor em relação ao líder */
  calcularTempoDeVantagem(tempoLider, tempoPerseguidor) {
    if (tempoLider <= 0 || tempoPerseguidor <= 0) throw new Error("Tempos devem ser positivos");
    if (tempoLider > tempoPerseguidor) throw new Error("O tempo do líder deve ser menor");
    return Number((tempoPerseguidor - tempoLider).toFixed(3));
  }

  /** 4. Verifica a regra dos 107% (se o piloto está qualificado para a corrida) */
  verificarRegra107Porcento(tempoDoPiloto, tempoDaPolePosition) {
    if (tempoDoPiloto <= 0 || tempoDaPolePosition <= 0) throw new Error("Tempos inválidos");
    const tempoCorte = tempoDaPolePosition * 1.07;
    return tempoDoPiloto <= tempoCorte;
  }

  /** 5. Calcula a porcentagem de desgaste do pneu com base nas voltas e composto */
  calcularDesgasteDoPneu(voltasPercorridas, tipoDePneu) {
    if (voltasPercorridas < 0) throw new Error("Número de voltas inválido");
    
    let fatorDesgaste;
    if (tipoDePneu === "Macio") fatorDesgaste = 3.5;
    else if (tipoDePneu === "Medio") fatorDesgaste = 2.0;
    else if (tipoDePneu === "Duro") fatorDesgaste = 1.2;
    else throw new Error("Tipo de pneu desconhecido");

    const desgaste = voltasPercorridas * fatorDesgaste;
    return desgaste > 100 ? 100 : Number(desgaste.toFixed(1));
  }

  /** 6. Verifica se o pit stop é recomendado com base no desgaste e clima */
  verificarPitStopRecomendado(desgastePneu, combustivel, chovendo) {
    if (desgastePneu < 0 || desgastePneu > 100) throw new Error("Desgaste deve ser entre 0 e 100");
    if (desgastePneu > 80 || combustivel < 10) return true;
    if (chovendo && desgastePneu > 50) return true;
    return false;
  }

  /** 7. Calcula o consumo de combustível baseado no tipo de motor */
  calcularConsumo(distancia, tipoMotor) {
    const taxas = { "V8": 0.5, "V6": 0.3, "Eletrico": 0.1 };
    const taxa = taxas[tipoMotor];
    if (!taxa) throw new Error("Tipo de motor não suportado");
    return distancia * taxa;
  }

  /** 8. Verifica se o piloto deve ser desclassificado por excesso de faltas */
  verificarDesclassificacaoPorFaltas(numeroDePenalidades) {
    if (numeroDePenalidades < 0) throw new Error("Penalidades não podem ser negativas");
    return numeroDePenalidades >= 3;
  }

  /** 9. Calcula a taxa de ocupação das arquibancadas em porcentagem */
  calcularTaxaDeOcupacao(publicoPresente, capacidadeMaxima) {
    if (publicoPresente < 0 || capacidadeMaxima <= 0) {
      throw new Error("Valores de público ou capacidade inválidos");
    }
    if (publicoPresente > capacidadeMaxima) {
      throw new Error("O público presente não pode ser maior que a capacidade máxima");
    }
    const taxa = (publicoPresente / capacidadeMaxima) * 100;
    return Number(taxa.toFixed(2));
  }

  /** 10. Calcula a velocidade média em km/h */
  calcularVelocidadeMedia(distanciaKm, tempoHoras) {
    if (tempoHoras <= 0) throw new Error("O tempo deve ser positivo");
    if (distanciaKm < 0) throw new Error("A distância não pode ser negativa");
    return Number((distanciaKm / tempoHoras).toFixed(2));
  }

  /** 11. Estima o combustível necessário para terminar a corrida */
  estimarCombustivelNecessario(voltasFaltantes, consumoPorVolta, margemSeguranca = 1.1) {
    if (voltasFaltantes <= 0) return 0;
    return Number((voltasFaltantes * consumoPorVolta * margemSeguranca).toFixed(2));
  }

  /** 12. Aplica boost de nitro, respeitando o limite do motor */
  aplicarBoostDeNitro(velocidadeAtual, limiteMotor, potenciaNitro) {
    const novaVelocidade = velocidadeAtual + potenciaNitro;
    return novaVelocidade > limiteMotor ? limiteMotor : novaVelocidade;
  }

  /** 13. Calcula o dano recebido em uma batida */
  calcularDanoDeBatida(velocidadeImpacto, resistenciaLataria) {
    if (resistenciaLataria <= 0) throw new Error("A resistência deve ser maior que zero");
    const dano = (velocidadeImpacto * 2) - resistenciaLataria;
    return dano < 0 ? 0 : Number(dano.toFixed(1));
  }

  /** 14. Calcula o saldo de posições ganhas ou perdidas pelo piloto */
  calcularPosicoesGanhas(posicaoLargada, posicaoChegada) {
    if (posicaoLargada <= 0 || posicaoChegada <= 0) throw new Error("Posições devem ser maiores que zero");
    return posicaoLargada - posicaoChegada; 
  }

  /** 15. Calcula a pontuação baseada na posição de chegada e volta mais rápida */
  calcularPontuacao(posicao, fezVoltaMaisRapida) {
    if (posicao <= 0) throw new Error("Posição inválida");
    const tabelaPontos = { 1: 25, 2: 18, 3: 15, 4: 12, 5: 10 };
    let pontos = tabelaPontos[posicao] || 0;
    
    // Ponto extra apenas se chegou no Top 10
    if (fezVoltaMaisRapida && posicao <= 10) pontos += 1;
    return pontos;
  }

  /** 16. Converte velocidade entre KM/H e MPH */
  converterVelocidade(valor, unidadeDestino) {
    if (valor < 0) throw new Error("Velocidade não pode ser negativa");
    if (unidadeDestino === "MPH") return Number((valor * 0.621371).toFixed(2));
    if (unidadeDestino === "KMH") return Number((valor * 1.60934).toFixed(2));
    throw new Error("Unidade de destino inválida");
  }

  /** 17. Calcula a distância de frenagem com base na física básica (v² / 2μg) */
  calcularDistanciaDeFrenagem(velocidadeMetrosPorSegundo, coeficienteAtrito) {
    if (coeficienteAtrito <= 0) throw new Error("Coeficiente de atrito inválido");
    const gravidade = 9.81;
    const distancia = Math.pow(velocidadeMetrosPorSegundo, 2) / (2 * coeficienteAtrito * gravidade);
    return Number(distancia.toFixed(2));
  }

  /** 18. Verifica se o piloto pode ativar a Asa Móvel (DRS) */
  podeAtivarDRS(distanciaProCarroDaFrente, estaNaZonaDeDRS) {
    if (distanciaProCarroDaFrente < 0) throw new Error("Distância inválida");
    // DRS só pode ser ativado a menos de 1 segundo do carro da frente e na zona correta
    return distanciaProCarroDaFrente <= 1.0 && estaNaZonaDeDRS === true;
  }

  /** 19. Verifica se a corrida já terminou */
  verificarFimDeProva(voltasCompletadas, totalDeVoltas) {
    if (voltasCompletadas < 0 || totalDeVoltas <= 0) throw new Error("Valores inválidos");
    return voltasCompletadas >= totalDeVoltas;
  }

  /** 20. Analisa o desempenho de um corredor e retorna uma classificação em texto */
  analisarDesempenho(posicao, posicoesGanhas) {
    if (posicao === 1) return "Vitória dominante";
    if (posicao <= 3) return "Pódio garantido";
    if (posicoesGanhas >= 5) return "Ótima corrida de recuperação";s
    if (posicoesGanhas < 0) return "Desempenho abaixo do esperado";
    return "Corrida regular";
  }
}

module.exports = CorridaUtils;