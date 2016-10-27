// import ReactDOMServer from 'react-dom/server'

class Editable {
  store: any = null
  id: string

  // serialize = (e: Editable) => e.store
  //
  // renderToHtml = (e: Editable) => new Promise((res: () => Promise) => {
  //   res(ReactDOMServer.renderToStaticMarkup(<EditorComponent store={e.store} id={e.id} />))
  // })
}

export default Editable
