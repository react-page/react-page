import uuid from 'node-uuid'

export const content = {
  1: {
    id: '1',
    rows: [
      {
        cells: [
          {
            layout: {
              name: 'ory/layout/grey'
            },
            rows: [
              {
                cells: [
                  {
                    plugin: { name: 'ory/content/draft-js' },
                    data: {
                      importFromHtml: '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        cells: [
          {
            rows: [
              {
                cells: [{
                  plugin: { name: 'ory/content/spacer' },
                  data: {
                    height: '50px'
                  }
                }]
              },
              {
                cells: [
                  {
                    plugin: { name: 'ory/content/draft-js' },
                    data: {
                      importFromHtml: 'Residents of the Castle Point borough of Essex in England celebrated the queen’s 90th birthday this month. Castle Point is the most ethnically English part of the United Kingdom, with nearly 80 percent describing themselves as purely English, while 95 percent are white. <small>Credit Andrew Testa for The New York Times</small>'
                    }
                  }
                ]
              }
            ]
          },
          {
            plugin: { name: 'ory/content/image' },
            data: {
              src: 'https://static01.nyt.com/images/2016/06/16/world/16England-web1/16England-web1-master768.jpg'
            }
          }
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
                    plugin: { name: 'ory/content/draft-js' },
                    data: {
                      importFromHtml: `<p>SOUTH BENFLEET, England — The topic of the local debate was Britain’s imminent vote on whether to leave the European Union, and the discussion in this English town on the southeastern coast turned to the influx of European citizens into Britain.</p>
<p>“Why do they all want to come here?” demanded one woman, angrily making the case for Britain to leave the bloc at the debate in South Benfleet, organized by the local council. “They want our wages and our benefits! We’re too bloody soft!”</p>
<p>Paddy Ashdown, a former leader of the Liberal Democrats and a supporter of remaining in the European Union in the vote next Thursday, shook his head and responded with a touch of bitterness: “Well, I’ve not seen much evidence of that here.”</p>`
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
                                    plugin: { name: 'ory/content/draft-js' },
                                    data: {
                                      importFromHtml: 'If Britain votes to leave, it will be in large part because of strong anti-Europe sentiment in much of England, the heart of the movement to divorce Britain from the Continent. Pollsters and analysts say that while Scotland and Northern Ireland are expected to vote overwhelmingly to stay in the bloc, England, far more populous, is likely to go the other way, reflecting a broad and often bluntly expressed view that English identity and values are being washed away by subordination to the bureaucrats of Brussels.'
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    inline: 'right',
                    plugin: { name: 'ory/content/image' },
                    data: {
                      src: 'https://static01.nyt.com/images/2016/06/16/world/16England-web2/16England-web2-master675.jpg'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        cells: [
          {
            id: 'foobar',
            layout: {
              name: 'ory/layout/spoiler'
            },
            rows: [
              {
                cells: [
                  {
                    rows: [
                      {
                        cells: [{
                          plugin: { name: 'ory/content/draft-js' },
                          data: {
                            importFromHtml: 'That sense of resurgent Englishness is palpable in places like South Benfleet, in the heart of a district that is the most ethnically English part of the United Kingdom, according to the Office of National Statistics based on the 2011 census, with nearly 80 percent describing themselves as purely English, while 95 percent are white. They are older than the national average, and only about one-quarter of 1 percent are foreign nationals, very low compared with the rest of Britain.'
                          }
                        }]
                      }
                    ]
                  },
                  {
                    rows: [
                      {
                        cells: [
                          {
                            plugin: { name: 'ory/content/draft-js' },
                            data: {
                              importFromHtml: 'Castle Point district of Essex, full of people who have made it out of London’s tough East End to a kind of English paradise with lots of single-family homes, lawns, beaches, seaside amusement parks and fish-and-chip shops.'
                            }
                          },
                          {
                            id: uuid.v4(),
                            plugin: { name: 'ory/content/draft-js' },
                            data: {
                              importFromHtml: 'The people here are fiercely English, fiercely Conservative and fiercely pro-Brexit, as the possible exit is being called, and many feel that their sovereignty and identity are being diluted by a failing European Union and an “uncontrolled” influx of foreigners.'
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
      }
    ]
  },
  2: {
    id: '2',
    rows: [
      {
        cells: [
          {
            layout: {
              name: 'ory/layout/grey'
            },
            rows: [
              {
                cells: [
                  {
                    plugin: { name: 'ory/content/draft-js' },
                    data: {
                      importFromHtml: 'Lorem ipsum dolor sit amet, <strong>consetetur sadipscing elitr</strong>, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                    }
                  }
                ]
              },
              {
                cells: [
                  {
                    plugin: { name: 'ory/content/draft-js' },
                    data: {
                      importFromHtml: 'Duis autem vel eum<script type="text/javascript">alert("XSS");</script> iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
                    }
                  }
                ]
              },
              {
                cells: [
                  {
                    plugin: { name: 'ory/content/draft-js' },
                    data: {
                      importFromHtml: 'Ut wisi enim ad minim veniam, quis nostrud <em>exerci tation ullamcorper suscipit</em> lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
                    }
                  }
                ]
              },
              {
                cells: [
                  {
                    plugin: { name: 'ory/content/draft-js' },
                    data: {
                      importFromHtml: 'Nam liber tempor cum <span style="font-size: 3em">soluta nobis eleifend</span> option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'
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
}

export class DebugStorageAdapter {
  fetch(element) {
    const id = element.dataset.debugEditable
    return content[id] || null
  }

  store(state = {}) {
    console.warn('Debug adapter can\'t persist state: ', state)
  }
}
