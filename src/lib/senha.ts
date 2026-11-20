/**
 * Política de senha do F.O.C.O (RNF02):
 * - 8 a 20 caracteres, com letra maiúscula, letra minúscula e número;
 * - sem sequências de 4 ou mais caracteres (ex.: 1234, abcd, 4321);
 * - sem conter o nome ou o e-mail do usuário.
 *
 * As funções são "puras": recebem os dados e devolvem o resultado, sem
 * depender da tela. Assim a mesma regra serve para a lista de requisitos
 * e para o indicador de força (que nunca mostra "Excelente" para uma senha
 * que seria recusada).
 */

export type Regra = { id: string; texto: string; ok: boolean }

/** Procura 4 caracteres seguidos em ordem crescente ou decrescente (ex.: 1234, dcba). */
export function temSequencia(senha: string): boolean {
  const s = senha.toLowerCase()
  for (let i = 0; i + 3 < s.length; i++) {
    const c = [0, 1, 2, 3].map((k) => s.charCodeAt(i + k))
    const mesmoTipo = /^[a-z]{4}$|^[0-9]{4}$/.test(s.slice(i, i + 4))
    if (!mesmoTipo) continue
    const sobe = c[1] - c[0] === 1 && c[2] - c[1] === 1 && c[3] - c[2] === 1
    const desce = c[0] - c[1] === 1 && c[1] - c[2] === 1 && c[2] - c[3] === 1
    if (sobe || desce) return true
  }
  return false
}

/** Verifica se a senha contém o nome (partes com 3+ letras) ou o início do e-mail. */
export function contemDadosPessoais(senha: string, nome: string, email: string): boolean {
  const s = senha.toLowerCase()
  const partesNome = nome.toLowerCase().split(/\s+/).filter((p) => p.length >= 3)
  const usuarioEmail = email.toLowerCase().split('@')[0]
  if (partesNome.some((p) => s.includes(p))) return true
  if (usuarioEmail.length >= 3 && s.includes(usuarioEmail)) return true
  return false
}

export function regrasDaSenha(senha: string, nome: string, email: string): Regra[] {
  return [
    { id: 'tamanho', texto: '8 a 20 caracteres', ok: senha.length >= 8 && senha.length <= 20 },
    { id: 'maiuscula', texto: 'Uma letra maiúscula', ok: /[A-Z]/.test(senha) },
    { id: 'minuscula', texto: 'Uma letra minúscula', ok: /[a-z]/.test(senha) },
    { id: 'numero', texto: 'Um número', ok: /[0-9]/.test(senha) },
    { id: 'sequencia', texto: 'Sem sequências (como 1234)', ok: senha.length > 0 && !temSequencia(senha) },
    { id: 'pessoal', texto: 'Sem o seu nome ou e-mail', ok: senha.length > 0 && !contemDadosPessoais(senha, nome, email) },
  ]
}

export type Forca = { nivel: 0 | 1 | 2 | 3 | 4; rotulo: string }

/**
 * Indicador de força. Se alguma regra falhar, o máximo é "Fraca",
 * para nunca contradizer a validação final do cadastro.
 */
export function forcaDaSenha(senha: string, nome: string, email: string): Forca {
  if (!senha) return { nivel: 0, rotulo: '' }
  const regras = regrasDaSenha(senha, nome, email)
  const aprovadas = regras.filter((r) => r.ok).length
  if (aprovadas < regras.length) return { nivel: 1, rotulo: 'Fraca' }
  const extras = (senha.length >= 12 ? 1 : 0) + (/[^A-Za-z0-9]/.test(senha) ? 1 : 0)
  if (extras === 0) return { nivel: 2, rotulo: 'Boa' }
  if (extras === 1) return { nivel: 3, rotulo: 'Forte' }
  return { nivel: 4, rotulo: 'Excelente' }
}

export const emailValido = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
