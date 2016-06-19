import React from "react";
import ReactDOM from "react-dom";
import Editor from "./editor"
import uuid from "node-uuid";
import Spacer from "src/common/Plugins/Spacer";
import Image from "src/common/Plugins/Image";
import {EditorState, convertFromHTML, ContentState} from "draft-js"
import DraftJS from "src/common/Plugins/DraftJS"
import Spoiler from "src/common/Layouts/Spoiler"

const dummyContent = [
  {
    rows: [
      {
        cells: [
          {
            plugin: DraftJS,
            data: {
              editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML('<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>')))
            }
          }
        ]
      },
      {
        cells: [
          {
            rows: [
              {
                cells: [{
                  plugin: Spacer,
                  data: {
                    height: '50px'
                  }
                }]
              },
              {
                cells: [
                  {
                    plugin: DraftJS,
                    data: {
                      editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML('Residents of the Castle Point borough of Essex in England celebrated the queen’s 90th birthday this month. Castle Point is the most ethnically English part of the United Kingdom, with nearly 80 percent describing themselves as purely English, while 95 percent are white. <small>Credit Andrew Testa for The New York Times</small>')))
                    }
                  }
                ]
              }
            ],
          },
          {
            plugin: Image,
            data: {
              src: `https://static01.nyt.com/images/2016/06/16/world/16England-web1/16England-web1-master768.jpg`
            }
          },
        ]
      },
      {
        cells: [
          {
            rows: [
              {
                id: uuid.v4(),
                cells: [
                  {
                    plugin: DraftJS,
                    data: {
                      editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(`<p>SOUTH BENFLEET, England — The topic of the local debate was Britain’s imminent vote on whether to leave the European Union, and the discussion in this English town on the southeastern coast turned to the influx of European citizens into Britain.</p>
<p>“Why do they all want to come here?” demanded one woman, angrily making the case for Britain to leave the bloc at the debate in South Benfleet, organized by the local council. “They want our wages and our benefits! We’re too bloody soft!”</p>
<p>Paddy Ashdown, a former leader of the Liberal Democrats and a supporter of remaining in the European Union in the vote next Thursday, shook his head and responded with a touch of bitterness: “Well, I’ve not seen much evidence of that here.”</p>`)))
                    }
                  }
                ]
              }
            ]
          },
          {
            rows: [
              {
                cells: [
                  {
                    rows: [
                      {
                        cells: [
                          {
                            rows: [
                              {
                                cells: [
                                  {
                                    plugin: DraftJS,
                                    data: {
                                      editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML('If Britain votes to leave, it will be in large part because of strong anti-Europe sentiment in much of England, the heart of the movement to divorce Britain from the Continent. Pollsters and analysts say that while Scotland and Northern Ireland are expected to vote overwhelmingly to stay in the bloc, England, far more populous, is likely to go the other way, reflecting a broad and often bluntly expressed view that English identity and values are being washed away by subordination to the bureaucrats of Brussels.')))
                                    }
                                  },
                                ]
                              },
                            ]
                          },
                        ]
                      },]
                  },
                  {
                    plugin: Image,
                    data: {
                      src: `https://static01.nyt.com/images/2016/06/16/world/16England-web2/16England-web2-master675.jpg`
                    }
                  },
                ]
              }
            ]
          }
        ]
      },
      {
        wrap: {
          component: Spoiler
        },
        cells: [
          {
            rows: [
              {
                cells: [{
                  plugin: DraftJS,
                  data: {
                    editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML( 'That sense of resurgent Englishness is palpable in places like South Benfleet, in the heart of a district that is the most ethnically English part of the United Kingdom, according to the Office of National Statistics based on the 2011 census, with nearly 80 percent describing themselves as purely English, while 95 percent are white. They are older than the national average, and only about one-quarter of 1 percent are foreign nationals, very low compared with the rest of Britain.')))
                  }
                }               ]
              }
            ]
          },
          {
            rows: [
              {
                cells: [
                  {
                    plugin: DraftJS,
                    data: {
                      editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML('Castle Point district of Essex, full of people who have made it out of London’s tough East End to a kind of English paradise with lots of single-family homes, lawns, beaches, seaside amusement parks and fish-and-chip shops.')))
                    }
                  },
                  {
                    id: uuid.v4(),
                    plugin: DraftJS,
                    data: {
                      editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML( 'The people here are fiercely English, fiercely Conservative and fiercely pro-Brexit, as the possible exit is being called, and many feel that their sovereignty and identity are being diluted by a failing European Union and an “uncontrolled” influx of foreigners.')))
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

const editor = new Editor({
  editables: dummyContent
})

if (module.hot) {
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(<RedBox error={error}/>, document.getElementById("app"))
  }

  const render = (elements) => {
    try {
      editor.render(elements)
    } catch (error) {
      renderError(error)
    }
  }

  module.hot.accept('src/common', () => {
    setTimeout(render)
  })
}

editor.render(document.querySelectorAll('.editable'))
