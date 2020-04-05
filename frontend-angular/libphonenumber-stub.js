// É usado para eliminar a biblioteca de validação de números de telefone
// ela é muito pesada e não vale a pena manter no frontend
module.exports = {
  PhoneNumberUtil: {
    getInstance() {
      return null;
    },
  },
};
