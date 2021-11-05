const processFile = require('./controls/control')

test('Processamento de arquivo', async () => {
    const body = {
        file_uploader:1
    }
    const result = await processFile.process_file(body);
    expect(result).toEqual({state:200,data:"Event occurred successful"});
})

test('Consultar movimento cnab', async () => {
    const body = {
        limit:1,
        offset:0
    }
    const result = await processFile.find_mov_cnab(body);
    expect(result.data.length).toEqual(1);
})
