const processFile = require('./controls/processFile')

test('Processamento de arquivo', async () => {
    const result = await processFile.process_file({file_uploader:1});
    expect(result).toEqual({state:200,data:"Event occurred successful"});
})
