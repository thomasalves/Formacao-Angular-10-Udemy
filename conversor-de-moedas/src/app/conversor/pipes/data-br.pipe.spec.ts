import { DataBrPipe } from './data-br.pipe';

describe('DataBrPipe', () => {
  it('create an instance', () => {
    const pipe = new DataBrPipe();
    expect(pipe).toBeTruthy();
  });

  it('deve formatar a data', () => {
    const pipe = new DataBrPipe();
    expect(pipe.transform('2021-01-21')).toEqual('21/01/2021')
  })
});
