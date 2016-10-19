// @flow
/* eslint no-useless-computed-key: "off" */
import { AbstractAdapter } from './adapter'

export const content = {
  [1]: {
    id: '1',
    cells: [{
      rows: [{
        cells: [{
          rows: [{
            cells: [{
              content: {
                plugin: { name: 'ory/content/slate' },
                state: {
                  importFromHtml: '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>'
                }
              }
            }]
          }]
        }]
      }, {
        cells: [{
          rows: [{
            cells: [{
              content: {
                plugin: { name: 'ory/content/spacer' },
                state: {
                  height: 50
                }
              }
            }]
          }, {
            cells: [{
              content: {
                plugin: { name: 'ory/content/slate' },
                state: {
                  importFromHtml: '<p>Residents of the Castle Point borough of Essex in England celebrated the queen’s 90th birthday this month. Castle Point is the most ethnically English part of the United Kingdom, with nearly 80 percent describing themselves as purely English, while 95 percent are white. Credit Andrew Testa for The New York Times</p>'
                }
              }
            }]
          }]
        }, {
          content: {
            plugin: { name: 'ory/content/image' },
            state: {
              src: 'https://static01.nyt.com/images/2016/06/16/world/16England-web1/16England-web1-master768.jpg'
            }
          }
        }]
      }, {
        cells: [{
          rows: [{
            cells: [{
              content: {
                plugin: { name: 'ory/content/slate' },
                state: {
                  importFromHtml: `<p>SOUTH BENFLEET, England — The topic of the local debate was Britain’s imminent vote on whether to leave the European Union, and the discussion in this English town on the southeastern coast turned to the influx of European citizens into Britain.</p>
<p>“Why do they all want to come here?” demanded one woman, angrily making the case for Britain to leave the bloc at the debate in South Benfleet, organized by the local council. “They want our wages and our benefits! We’re too bloody soft!”</p>
<p>Paddy Ashdown, a former leader of the Liberal Democrats and a supporter of remaining in the European Union in the vote next Thursday, shook his head and responded with a touch of bitterness: “Well, I’ve not seen much evidence of that here.”</p>`
                }
              },
            }]
          }]
        }, {
          rows: [{
            cells: [{
              rows: [{
                cells: [{
                  rows: [{
                    cells: [{
                      inline: 'left',
                      content: {
                        plugin: { name: 'ory/content/image' },
                        state: {
                          src: 'https://static01.nyt.com/images/2016/06/16/world/16England-web2/16England-web2-master675.jpg'
                        }
                      }
                    }, {
                      content: {
                        plugin: { name: 'ory/content/slate' },
                        state: {
                          importFromHtml: '<p>If Britain votes to leave, it will be in large part because of strong anti-Europe sentiment in much of England, the heart of the movement to divorce Britain from the Continent. Pollsters and analysts say that while Scotland and Northern Ireland are expected to vote overwhelmingly to stay in the bloc, England, far more populous, is likely to go the other way, reflecting a broad and often bluntly expressed view that English identity and values are being washed away by subordination to the bureaucrats of Brussels.</p>'
                        }
                      }
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      }, {
        cells: [{
          layout: {
            plugin: {
              name: 'ory/layout/spoiler'
            }
          },
          rows: [{
            cells: [{
              rows: [{
                cells: [{
                  content: {
                    plugin: { name: 'ory/content/slate' },
                    state: {
                      importFromHtml: '<p>That sense of resurgent Englishness is palpable in places like South Benfleet, in the heart of a district that is the most ethnically English part of the United Kingdom, according to the Office of National Statistics based on the 2011 census, with nearly 80 percent describing themselves as purely English, while 95 percent are white. They are older than the national average, and only about one-quarter of 1 percent are foreign nationals, very low compared with the rest of Britain.</p>'
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/content/slate' },
                    state: {
                      importFromHtml: '<p>Castle Point district of Essex, full of people who have made it out of London’s tough East End to a kind of English paradise with lots of single-family homes, lawns, beaches, seaside amusement parks and fish-and-chip shops.</p>'
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/content/slate' },
                    state: {
                      importFromHtml: '<p>The people here are fiercely English, fiercely Conservative and fiercely pro-Brexit, as the possible exit is being called, and many feel that their sovereignty and identity are being diluted by a failing European Union and an “uncontrolled” influx of foreigners.</p>'
                    }
                  }
                }]
              }]
            }]
          }]
        }]
      }]
    }]
  },
  [2]: {
    id: '2',
    cells: [{
      rows: [{
        cells: [{
          layout: {
            plugin: { name: 'ory/layout/card', version: '0.0.1' },
            state: {}
          },
          rows: [{
            cells: [{
              content: {
                plugin: { name: 'ory/content/slate' },
                state: {}
              }
            }]
          }]
        }]
      }, {
        cells: [{
          content: {
            plugin: { name: 'ory/content/slate' },
            state: {}
          }
        }]
      }, {
        cells: [{
          rows: [{
            cells: [{
              inline: 'right',
              content: {
                plugin: { name: 'ory/content/image' },
                state: {
                  src: 'https://static01.nyt.com/images/2016/06/16/world/16England-web2/16England-web2-master675.jpg'
                }
              }
            }, {
              content: {
                plugin: { name: 'ory/content/slate' },
                state: {
                  importFromHtml: '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>'
                }
              }
            }]
          }, {
            cells: [{
              content: {
                plugin: { name: 'ory/content/slate' },
                state: {
                  importFromHtml: '<p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>'
                }
              }
            }]
          }, {
            cells: [{
              content: {
                plugin: { name: 'ory/content/slate' },
                state: {
                  importFromHtml: '<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>'
                }
              }
            }
            ]
          }, {
            cells: [{
              content: {
                plugin: { name: 'ory/content/slate' },
                state: {
                  importFromHtml: '<p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>'
                }
              }
            }]
          }]
        }]
      }]
    }]
  },
  [3]: {
    id: '3',
    cells: [{
      rows: [{
        cells: [{
          rows: [{
            cells: [{
              content: {
                plugin: { name: 'ory/content/slate' },
                state: {
                  importFromHtml: '<h1>Lorem ipsum dolor adipiscing amet dolor consequat</h1><p>Adipiscing a commodo ante nunc accumsan et interdum mi ante adipiscing. A nunc lobortis non nisl amet vis sed volutpat aclacus nascetur ac non. Lorem curae et ante amet sapien sed tempus adipiscing id accumsan.</p>'
                }
              }
            }, {
              content: {
                plugin: { name: 'ory/content/spacer' },
                state: {
                  height: 50
                }
              }
            }]
          }]
        }]
      }]
    }]
  },
  [4]: {
    id: '4',
    cells: [{
      rows: [{
        cells: [{
          rows: [{
            cells: [{
              content: {
                plugin: { name: 'ory/content/slate' },
                state: {
                  importFromHtml: `<h1>Hi, I'm Photon, another fine little freebie from HTML5 UP.</h1>
            <p>This is an example page for the ORY Editor. Check out the buttons on the right.</p>`
                }
              }
            }]
          }]
        }]
      }]
    }]
  },
  [5]: {
    id: '5',
    cells: [{
      rows: [{
        cells: [{
          layout: {
            plugin: {
              name: 'ory/layout/parallax'
            },
            state: { style: 1 }
          }, rows: [{
            cells: [{
              rows: [{
                cells: [{
                  content: {
                    plugin: { name: 'ory/content/slate' },
                    state: {
                      importFromHtml: '<h1>Lorem ipsum dolor adipiscing amet dolor consequat</h1><p>Adipiscing a commodo ante nunc accumsan et interdum mi ante adipiscing. A nunc lobortis non nisl amet vis sed volutpat aclacus nascetur ac non. Lorem curae et ante amet sapien sed tempus adipiscing id accumsan.</p>'
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/content/image' },
                    state: {
                      src: 'images/pic01.jpg'
                    }
                  }
                }]
              }]
            }]
          }]
        }]
      }, {
        cells: [{
          layout: {
            plugin: {
              name: 'ory/layout/parallax'
            },
            state: { style: 2 }
          },
          rows: [{
            cells: [{
              content: {
                plugin: { name: 'ory/content/slate' },
                state: {
                  importFromHtml: `
<h2>Lorem ipsum dolor adipiscing<br/>
amet dolor consequat</h2>
<p>Adipiscing a commodo ante nunc accumsan interdum mi ante adipiscing. A nunc lobortis non nisl amet vis
volutpat aclacus nascetur ac non. Lorem curae eu ante amet sapien in tempus ac. Adipiscing id accumsan
adipiscing ipsum.</p>
<p>Blandit faucibus proin. Ac aliquam integer adipiscing enim non praesent vis commodo nunc phasellus cubilia ac
risus accumsan. Accumsan blandit. Lobortis phasellus non lobortis dit varius mi varius accumsan lobortis.
Blandit ante aliquam lacinia lorem lobortis semper morbi col faucibus vitae integer placerat accumsan orci eu
mi odio tempus adipiscing adipiscing adipiscing curae consequat feugiat etiam dolore.</p>
<p>Adipiscing a commodo ante nunc accumsan interdum mi ante adipiscing. A nunc lobortis non nisl amet vis
volutpat aclacus nascetur ac non. Lorem curae eu ante amet sapien in tempus ac. Adipiscing id accumsan
adipiscing ipsum.</p>`
                }
              }
            }, {
              rows: [{
                cells: [{
                  content: {
                    plugin: { name: 'ory/content/fa-icon' },
                    state: { icon: 'fa-code', style: '1' }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/content/fa-icon' },
                    state: { icon: 'fa-bolt', style: '1' }
                  }
                }]
              }, {
                cells: [{
                  content: {
                    plugin: { name: 'ory/content/fa-icon' },
                    state: { icon: 'fa-camera-retro', style: '2' }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/content/fa-icon' },
                    state: { icon: 'fa-cog', style: '3' }
                  }
                }]
              }, {
                cells: [{
                  content: {
                    plugin: { name: 'ory/content/fa-icon' },
                    state: { icon: 'fa-desktop', style: '4' }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/content/fa-icon' },
                    state: { icon: 'fa-calendar', style: '5' }
                  }
                }]
              }]
            }]
          }]
        }]
      }, {
        cells: [{
          layout: {
            plugin: {
              name: 'ory/layout/parallax'
            },
            state: { style: 1, align: 'center' }
          }, rows: [{
            cells: [{
              rows: [{
                cells: [{
                  content: {
                    plugin: { name: 'ory/content/slate' },
                    state: {
                      importFromHtml: '<h1>Adipiscing amet consequat</h1><p>Ante nunc accumsan et aclacus nascetur ac ante amet sapien sed.</p>'
                    }
                  }
                }]
              }, {
                cells: [{
                  content: {
                    plugin: { name: 'ory/content/image' },
                    state: {
                      src: 'images/pic02.jpg'
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/content/image' },
                    state: {
                      src: 'images/pic03.jpg'
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/content/image' },
                    state: {
                      src: 'images/pic04.jpg'
                    }
                  }
                }]
              }, {
                cells: [{
                  content: {
                    plugin: { name: 'ory/content/slate' },
                    state: {
                      importFromHtml: '<h3>Magna feugiat lorem</h3><p>Adipiscing a commodo ante nunc magna lorem et interdum mi ante nunc lobortis non amet vis sed volutpat et nascetur.</p>'
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/content/slate' },
                    state: {
                      importFromHtml: '<h3>Magna feugiat lorem</h3><p>Adipiscing a commodo ante nunc magna lorem et interdum mi ante nunc lobortis non amet vis sed volutpat et nascetur.</p>'
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/content/slate' },
                    state: {
                      importFromHtml: '<h3>Magna feugiat lorem</h3><p>Adipiscing a commodo ante nunc magna lorem et interdum mi ante nunc lobortis non amet vis sed volutpat et nascetur.</p>'
                    }
                  }
                }]
              }, {
                cells: [{
                  content: {
                    plugin: { name: 'ory/content/slate' },
                    state: {
                      importFromHtml: '<p>MORE</p>'
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/content/slate' },
                    state: {
                      importFromHtml: '<p>MORE</p>'
                    }
                  }
                }, {
                  content: {
                    plugin: { name: 'ory/content/slate' },
                    state: {
                      importFromHtml: '<p>MORE</p>'
                    }
                  }
                }]
              }]
            }]
          }]
        }]
      }, {
        cells: [{
          layout: {
            plugin: {
              name: 'ory/layout/parallax'
            },
            state: { style: 2, align: 'center' }
          },
          rows: [{
            cells: [{
              content: {
                plugin: { name: 'ory/content/slate' },
                state: {
                  importFromHtml: `
<h2>Ipsum feugiat consequat?</h2>
<p>Sed lacus nascetur ac ante amet sapien.</p>
<p>SIGN UP | LEARN MORE</p>`
                }
              }
            }]
          }]
        }]
      }]
    }]
  }
}

export class DebugStorageAdapter extends AbstractAdapter {
  fetch(element: Object) {
    const id = element.dataset.debugEditable
    return content[id]
  }

  store(state: Object) {
    console.log(state)
  }
}
