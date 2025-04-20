# PerformRequest
<b>The documentation are supported in English. You can switch to English ​​by clicking on [English Version](README.en.md) </b>

Faz requisições em APIs, de uma forma estruturada. 
<br/>
a response retornada pela API deve estar no formato JSON, 
<br/>
ou ele não poderá converter a response corretamente.

<h3> Propriedades </h3>
  <ul>
    <li><b>fetch;</b> contém as opções do fetch, igual ao fetch comum.
      <ul>
        <li><b>method;</b> método da requisição</li>
        <li><b>headers;</b> headers da requisição</li>
        <li><b>body;</b> body da requisição</li>
        <li><b>url;</b> url da requisição</li>
      </ul>
    </li>
    <li><b>message;</b> mensagem exibidas no final da requisição
      <ul>
        <li><b>success (string);</b> mensagem exibida no console se a requisição for bem-sucedida</li>
        <li><b>error (string);</b> mensagem exibida no console se a requisição falhou</li>
        <li><b>alert_error (boolean);</b> exibe a mensagem error com <i>alert()</i></li>
        <li><b>alert_success (boolean);</b> exibe a mensagem success com <i>alert()</i></li>
        <li><b>response;</b> você pode exibir valores da response específicos na mensagem. para configurar quais valores,
        </br>
        vá para src/PerformRequest.js, dentro da função formatMessage você encontrará os valores possíveis de serem exibidos.
        </br>
        exemplo; a mensagem <code>`{'status'} - {'res.info'}`</code> o mesmo que <code>`${res.status} - ${res_json.info}`</code>
          <ul>
            <li><b>{'status'}</b> = res.status</li>
            <li><b>{'res.info'}</b> = res_json.info</li>
          </ul>
        </li>
      </ul>
    </li>
    <li><b>function (opcional);</b> funções executadas durante a requisição, todas essas propriedades receberão funções.
      <ul>
        <li><b>success;</b> executada se a requisição for bem-sucedida, recebe como argumento a response no formato JSON</li>
        <li><b>error;</b> executada se a requisição falhou, recebe como argumento um objeto de error</li>
        <li><b>finally;</b> executada no final da requisição, independentemente do seu sucesso ou falha. não recebe argumento.</li>
      </ul>
    </li>
    <li><b>return (opcional);</b> valor retornado pela função PerformRequest(). usará palavras-chave para definir o valor retornado.
      <ul>
        <li><b>'res.ok'</b> retorna res.ok</li>
        <li><b>'res_json'</b> retorna a res formatada de JSON para objeto JS</li>
        <li><b>'res'</b> retorna a res sem formatação</li>
      </ul>
    </li>
  </ul>
</br>
exemplo de uso da função;

```javascript
const req = await PerformRequest({
  fetch: {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: body,
    url: `url`,
  },
  message: {
    success: `status.{'status'} - {'res.info'}`,
    error: `status.{'status'} - {'res.info'}`,
    alert_error: true,
    alert_success: true
  },
  function: {
    success: async (res_json) => { 
      console.log('success')
    },
    error: async (error) => {
      console.error(error)
    },
    finally: async () => {
      console.log('final')
    }
  },
  return: 'res.ok'
})
```

