const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    const item = await prisma.tarefa.create({
        data: {
            ...data,
            dataInicio: new Date(data.dataInicio + "T00:00:00"),
            dataFim: new Date(data.dataFim + "T00:00:00")
        }
    });

    res.status(201).json(item);
};

const listar = async (req, res) => {
    const lista = await prisma.tarefa.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.tarefa.findUnique({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.tarefa.update({
        where: { id : Number(id) },
        data: {
            ...dados,
            dataInicio: new Date(dados.dataInicio + "T00:00:00"),
            dataFim: new Date(dados.dataFim + "T00:00:00")
        }
    });

    res.status(200).json(item);
};

const excluir = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.tarefa.delete({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}
