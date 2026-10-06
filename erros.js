const mensagens = {
  'auth/invalid-email': 'Email inválido.',
  'auth/missing-password': 'Informe a senha.',
  'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
  'auth/email-already-in-use': 'Este email já está cadastrado.',
  'auth/invalid-credential': 'Email ou senha incorretos.',
  'auth/user-not-found': 'Usuário não encontrado.',
  'auth/wrong-password': 'Email ou senha incorretos.',
  'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
  'auth/network-request-failed': 'Sem conexão com a internet.',
  'auth/requires-recent-login': 'Por segurança, saia e entre novamente antes de excluir a conta.',
};

export const erroFirebase = (e) => mensagens[e?.code] || 'Ocorreu um erro. Tente novamente.';
