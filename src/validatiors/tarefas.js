export const validateSex = (text) => {
  if (!text || !text.length) return 'Sexo é obrigatório';

  if (text !== 'Masculino' & text !== 'masculino'
    & text !== 'Feminino' & text !== 'feminino') return 'Sexo deve ser masculino ou feminino';
};
