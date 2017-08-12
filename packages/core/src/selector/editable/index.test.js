import unexpected from 'unexpected'

import { purifiedNode, searchNodeEverywhere } from './index.js'

const expect = unexpected.clone()

const state = {
  editables: {
    present: [
      {
        id: '1',
        cells: [
          {
            levels: { left: 0, right: 0, above: 0, below: 0 },
            id: 'b045776a-c2a3-40ed-8f6b-b188cd6a7427',
            hover: null,
            size: 12,
            bounds: { left: 0, right: 0 },
            resizable: false,
            inline: null,
            hasInlineNeighbourde: null,
            rows: [
              {
                levels: { left: 1, right: 1, above: 1, below: 0 },
                id: 'e514fa47-38c7-440e-8ac2-87494dee8d23',
                hover: null,
                cells: [
                  {
                    levels: { left: 2, right: 2, above: 2, below: 1 },
                    props: {
                      importFromHtml:
                        '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>'
                    },
                    id: 'c38fa00e-6b34-4c6d-af3f-2c1374edad11',
                    plugin: {
                      name: 'ory/editor/core/content/slate',
                      version: '0.0.1'
                    },
                    hover: null,
                    size: 12,
                    bounds: { left: 0, right: 0 },
                    resizable: false,
                    inline: null,
                    hasInlineNeighbourde: null
                  }
                ]
              },
              {
                levels: { left: 1, right: 1, above: 0, below: 0 },
                id: '40635812-d539-47d7-a77f-a8ad0ca140f3',
                hover: null,
                cells: [
                  {
                    levels: { left: 2, right: 2, above: 1, below: 1 },
                    props: {},
                    id: 'f6db2d53-f97c-4fb5-959b-5633ea524d18',
                    plugin: {
                      name: 'ory/editor/core/content/image',
                      version: '0.0.1'
                    },
                    hover: null,
                    size: 12,
                    bounds: { left: 0, right: 0 },
                    resizable: false,
                    inline: null,
                    hasInlineNeighbourde: null
                  }
                ]
              },
              {
                levels: { left: 1, right: 1, above: 0, below: 0 },
                id: '02896bd0-bbd5-4943-89c4-15089744143a',
                hover: null,
                cells: [
                  {
                    levels: { left: 2, right: 0, above: 1, below: 1 },
                    id: 'a3e783dd-5fc3-4c8a-ac2d-546410eaa1e4',
                    hover: null,
                    size: 6,
                    bounds: { left: 0, right: 11 },
                    resizable: true,
                    inline: null,
                    hasInlineNeighbourde: null,
                    rows: [
                      {
                        levels: { left: 3, right: 1, above: 2, below: 0 },
                        id: 'd4f0d7c0-1329-4b17-886e-39c983a231ed',
                        hover: null,
                        cells: [
                          {
                            levels: { left: 4, right: 2, above: 3, below: 1 },
                            props: { height: 50 },
                            id: 'e799a338-da9d-49d9-93cf-bc9e356e1186',
                            plugin: {
                              name: 'ory/editor/core/content/spacer',
                              version: '0.0.1'
                            },
                            hover: null,
                            size: 12,
                            bounds: { left: 0, right: 0 },
                            resizable: false,
                            inline: null,
                            hasInlineNeighbourde: null
                          }
                        ]
                      },
                      {
                        levels: { left: 3, right: 1, above: 0, below: 2 },
                        id: '79810279-6059-407f-baa7-0cd96276c7f0',
                        hover: null,
                        cells: [
                          {
                            levels: { left: 4, right: 2, above: 1, below: 3 },
                            props: {
                              importFromHtml:
                                'Residents of the Castle Point borough of Essex in England celebrated the queen’s 90th birthday this month. Castle Point is the most ethnically English part of the United Kingdom, with nearly 80 percent describing themselves as purely English, while 95 percent are white. <small>Credit Andrew Testa for The New York Times</small>'
                            },
                            id: 'dd419480-aa37-40cd-af97-ba8c3e8ae2df',
                            plugin: {
                              name: 'ory/editor/core/content/slate',
                              version: '0.0.1'
                            },
                            hover: null,
                            size: 12,
                            bounds: { left: 0, right: 0 },
                            resizable: false,
                            inline: null,
                            hasInlineNeighbourde: null
                          }
                        ]
                      }
                    ]
                  },
                  {
                    levels: { left: 0, right: 2, above: 1, below: 1 },
                    props: {
                      src:
                        'https://static01.nyt.com/images/2016/06/16/world/16England-web1/16England-web1-master768.jpg'
                    },
                    id: '7ec840b7-1c54-46dd-acfe-ca2e973e1da4',
                    plugin: {
                      name: 'ory/editor/core/content/image',
                      version: '0.0.1'
                    },
                    hover: null,
                    size: 6,
                    bounds: { left: 11, right: 0 },
                    resizable: false,
                    inline: null,
                    hasInlineNeighbourde: null
                  }
                ]
              },
              {
                levels: { left: 1, right: 1, above: 0, below: 0 },
                id: 'b298dede-8fd4-4ac2-b95c-138b9f09962a',
                hover: null,
                cells: [
                  {
                    levels: { left: 2, right: 0, above: 1, below: 1 },
                    props: {
                      importFromHtml:
                        '<p>SOUTH BENFLEET, England — The topic of the local debate was Britain’s imminent vote on whether to leave the European Union, and the discussion in this English town on the southeastern coast turned to the influx of European citizens into Britain.</p>\n<p>“Why do they all want to come here?” demanded one woman, angrily making the case for Britain to leave the bloc at the debate in South Benfleet, organized by the local council. “They want our wages and our benefits! We’re too bloody soft!”</p>\n<p>Paddy Ashdown, a former leader of the Liberal Democrats and a supporter of remaining in the European Union in the vote next Thursday, shook his head and responded with a touch of bitterness: “Well, I’ve not seen much evidence of that here.”</p>'
                    },
                    id: 'bc44aef2-013e-4553-9d18-52f21016d343',
                    plugin: {
                      name: 'ory/editor/core/content/slate',
                      version: '0.0.1'
                    },
                    hover: null,
                    size: 6,
                    bounds: { left: 0, right: 11 },
                    resizable: true,
                    inline: null,
                    hasInlineNeighbourde: null
                  },
                  {
                    levels: { left: 0, right: 2, above: 1, below: 1 },
                    id: '60bcd9ce-8490-4288-a378-6cc236d7bb3e',
                    hover: null,
                    size: 6,
                    bounds: { left: 11, right: 0 },
                    resizable: false,
                    inline: null,
                    hasInlineNeighbourde: null,
                    rows: [
                      {
                        levels: { left: 1, right: 3, above: 2, below: 2 },
                        id: '115cef7f-c878-4de8-b4d7-7e48df2626c5',
                        hover: null,
                        cells: [
                          {
                            levels: { left: 2, right: 0, above: 3, below: 3 },
                            inline: 'left',
                            props: {
                              src:
                                'https://static01.nyt.com/images/2016/06/16/world/16England-web2/16England-web2-master675.jpg'
                            },
                            id: '152615ee-9248-42cb-8d79-e5c412c8d92d',
                            plugin: {
                              name: 'ory/editor/core/content/image',
                              version: '0.0.1'
                            },
                            hover: null,
                            size: 6,
                            bounds: { left: 0, right: 11 },
                            resizable: true
                          },
                          {
                            levels: { left: 0, right: 4, above: 3, below: 3 },
                            props: {
                              importFromHtml:
                                'If Britain votes to leave, it will be in large part because of strong anti-Europe sentiment in much of England, the heart of the movement to divorce Britain from the Continent. Pollsters and analysts say that while Scotland and Northern Ireland are expected to vote overwhelmingly to stay in the bloc, England, far more populous, is likely to go the other way, reflecting a broad and often bluntly expressed view that English identity and values are being washed away by subordination to the bureaucrats of Brussels.'
                            },
                            id: '28d21f71-72fa-41cf-a4bd-f62d7f59bf63',
                            plugin: {
                              name: 'ory/editor/core/content/slate',
                              version: '0.0.1'
                            },
                            hover: null,
                            size: 12,
                            bounds: { left: 0, right: 0 },
                            resizable: false,
                            hasInlineNeighbourde: true
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                levels: { left: 1, right: 1, above: 0, below: 1 },
                id: 'ef595bbd-c97c-4471-9e2d-605908cebd79',
                hover: null,
                cells: [
                  {
                    levels: { left: 2, right: 2, above: 1, below: 2 },
                    id: '092f35a7-ab76-4e17-80db-917a9685a818',
                    layout: {
                      name: 'ory/editor/core/layout/spoiler',
                      version: '0.0.1'
                    },
                    hover: null,
                    size: 12,
                    bounds: { left: 0, right: 0 },
                    resizable: false,
                    inline: null,
                    hasInlineNeighbourde: null,
                    rows: [
                      {
                        levels: { left: 3, right: 3, above: 2, below: 3 },
                        id: '3a261db7-5351-437c-899b-27ebfaa31fe6',
                        hover: null,
                        cells: [
                          {
                            levels: { left: 4, right: 0, above: 3, below: 4 },
                            props: {
                              importFromHtml:
                                'That sense of resurgent Englishness is palpable in places like South Benfleet, in the heart of a district that is the most ethnically English part of the United Kingdom, according to the Office of National Statistics based on the 2011 census, with nearly 80 percent describing themselves as purely English, while 95 percent are white. They are older than the national average, and only about one-quarter of 1 percent are foreign nationals, very low compared with the rest of Britain.'
                            },
                            id: '9e4f897b-0199-439d-acbd-b98900448c94',
                            plugin: {
                              name: 'ory/editor/core/content/slate',
                              version: '0.0.1'
                            },
                            hover: null,
                            size: 4,
                            bounds: { left: 0, right: 7 },
                            resizable: true,
                            inline: null,
                            hasInlineNeighbourde: null
                          },
                          {
                            levels: { left: 0, right: 0, above: 3, below: 4 },
                            props: {
                              importFromHtml:
                                'Castle Point district of Essex, full of people who have made it out of London’s tough East End to a kind of English paradise with lots of single-family homes, lawns, beaches, seaside amusement parks and fish-and-chip shops.'
                            },
                            id: '4520496c-a98e-4b57-b06d-59d156e36451',
                            plugin: {
                              name: 'ory/editor/core/content/slate',
                              version: '0.0.1'
                            },
                            hover: null,
                            size: 4,
                            bounds: { left: 7, right: 7 },
                            resizable: true,
                            inline: null,
                            hasInlineNeighbourde: null
                          },
                          {
                            levels: { left: 0, right: 4, above: 3, below: 4 },
                            props: {
                              importFromHtml:
                                'The people here are fiercely English, fiercely Conservative and fiercely pro-Brexit, as the possible exit is being called, and many feel that their sovereignty and identity are being diluted by a failing European Union and an “uncontrolled” influx of foreigners.'
                            },
                            id: 'db728322-6a82-4338-81c4-adde626547a3',
                            plugin: {
                              name: 'ory/editor/core/content/slate',
                              version: '0.0.1'
                            },
                            hover: null,
                            size: 4,
                            bounds: { left: 7, right: 0 },
                            resizable: false,
                            inline: null,
                            hasInlineNeighbourde: null
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        config: {
          whitelist: [
            'ory/editor/core/content/missing',
            'ory/editor/core/content/image',
            'ory/editor/core/content/spacer',
            'ory/editor/core/content/slate',
            'ory/editor/core/layout/spoiler'
          ]
        }
      },
      {
        id: '2',
        cells: [
          {
            levels: { left: 0, right: 0, above: 0, below: 0 },
            id: '308536be-5e6d-4483-9a5d-7ab422b5fc15',
            hover: null,
            size: 12,
            bounds: { left: 0, right: 0 },
            resizable: false,
            inline: null,
            hasInlineNeighbourde: null,
            rows: [
              {
                levels: { left: 1, right: 1, above: 1, below: 0 },
                id: 'f394a468-a64a-479c-8318-4ef2f14433a3',
                hover: null,
                cells: [
                  {
                    levels: { left: 2, right: 0, above: 2, below: 1 },
                    inline: 'right',
                    props: {
                      src:
                        'https://static01.nyt.com/images/2016/06/16/world/16England-web2/16England-web2-master675.jpg'
                    },
                    id: '0fb41038-7f05-41b8-b5e5-e7cb8e7be701',
                    plugin: {
                      name: 'ory/editor/core/content/image',
                      version: '0.0.1'
                    },
                    hover: null,
                    size: 6,
                    bounds: { left: 11, right: 0 },
                    resizable: true
                  },
                  {
                    levels: { left: 0, right: 2, above: 2, below: 1 },
                    props: {
                      importFromHtml:
                        'Lorem ipsum dolor sit amet, <strong>consetetur sadipscing elitr</strong>, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, <strong>consetetur sadipscing elitr</strong>, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                    },
                    id: '2f0622c1-7546-4c2b-a8af-e9603cd67d96',
                    plugin: {
                      name: 'ory/editor/core/content/slate',
                      version: '0.0.1'
                    },
                    hover: null,
                    size: 12,
                    bounds: { left: 0, right: 0 },
                    resizable: false,
                    hasInlineNeighbourde: true
                  }
                ]
              },
              {
                levels: { left: 1, right: 1, above: 0, below: 0 },
                id: 'a5608665-732a-46a8-8d49-3e33247f8ca2',
                hover: null,
                cells: [
                  {
                    levels: { left: 2, right: 2, above: 1, below: 1 },
                    props: {
                      importFromHtml:
                        'Duis autem vel eum<script type="text/javascript">alert("XSS");</script> iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
                    },
                    id: '51877ffa-09e3-45fa-8e54-d462ac150a0e',
                    plugin: {
                      name: 'ory/editor/core/content/slate',
                      version: '0.0.1'
                    },
                    hover: null,
                    size: 12,
                    bounds: { left: 0, right: 0 },
                    resizable: false,
                    inline: null,
                    hasInlineNeighbourde: null
                  }
                ]
              },
              {
                levels: { left: 1, right: 1, above: 0, below: 0 },
                id: 'a61e8e9e-962a-433d-ae5b-cda93c834874',
                hover: null,
                cells: [
                  {
                    levels: { left: 2, right: 2, above: 1, below: 1 },
                    props: {
                      importFromHtml:
                        'Ut wisi enim ad minim veniam, quis nostrud <em>exerci tation ullamcorper suscipit</em> lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
                    },
                    id: '1935e40d-6b41-41ef-9221-ac5359938b69',
                    plugin: {
                      name: 'ory/editor/core/content/slate',
                      version: '0.0.1'
                    },
                    hover: null,
                    size: 12,
                    bounds: { left: 0, right: 0 },
                    resizable: false,
                    inline: null,
                    hasInlineNeighbourde: null
                  }
                ]
              },
              {
                levels: { left: 1, right: 1, above: 0, below: 1 },
                id: '8781492f-91e6-46ca-b2a6-b34f2e54fac6',
                hover: null,
                cells: [
                  {
                    levels: { left: 2, right: 2, above: 1, below: 2 },
                    props: {
                      importFromHtml:
                        'Nam liber tempor cum <span style="font-size: 3em">soluta nobis eleifend</span> option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'
                    },
                    id: '504b9377-05c2-47cc-b218-2513ddfb569a',
                    plugin: {
                      name: 'ory/editor/core/content/slate',
                      version: '0.0.1'
                    },
                    hover: null,
                    size: 12,
                    bounds: { left: 0, right: 0 },
                    resizable: false,
                    inline: null,
                    hasInlineNeighbourde: null
                  }
                ]
              }
            ]
          }
        ],
        config: {
          whitelist: [
            'ory/editor/core/content/missing',
            'ory/editor/core/content/image',
            'ory/editor/core/content/spacer',
            'ory/editor/core/content/slate',
            'ory/editor/core/layout/spoiler'
          ]
        }
      }
    ]
  },
  display: { previous: 'preview', mode: 'preview' }
}

describe('selectors/editable/node', () => {
  it('should find the right node (cell)', () => {
    expect(
      purifiedNode(state, {
        id: 'dd419480-aa37-40cd-af97-ba8c3e8ae2df',
        editable: '1'
      }),
      'to equal',
      {
        levels: { left: 4, right: 2, above: 1, below: 3 },
        props: {
          importFromHtml:
            'Residents of the Castle Point borough of Essex in England celebrated the queen’s 90th birthday this month. Castle Point is the most ethnically English part of the United Kingdom, with nearly 80 percent describing themselves as purely English, while 95 percent are white. <small>Credit Andrew Testa for The New York Times</small>'
        },
        id: 'dd419480-aa37-40cd-af97-ba8c3e8ae2df',
        plugin: { name: 'ory/editor/core/content/slate', version: '0.0.1' },
        hover: null,
        size: 12,
        bounds: { left: 0, right: 0 },
        resizable: false,
        inline: null,
        hasInlineNeighbourde: null
      }
    )
  })

  it('should find the right node (row)', () => {
    expect(
      purifiedNode(state, {
        id: 'f394a468-a64a-479c-8318-4ef2f14433a3',
        editable: '2'
      }),
      'to equal',
      {
        levels: { left: 1, right: 1, above: 1, below: 0 },
        id: 'f394a468-a64a-479c-8318-4ef2f14433a3',
        hover: null,
        cells: [
          '0fb41038-7f05-41b8-b5e5-e7cb8e7be701',
          '2f0622c1-7546-4c2b-a8af-e9603cd67d96'
        ]
      }
    )
  })

  it('should find the right node, everywhere', () => {
    expect(
      searchNodeEverywhere(state, '3a261db7-5351-437c-899b-27ebfaa31fe6').node
        .id,
      'to equal',
      '3a261db7-5351-437c-899b-27ebfaa31fe6'
    )
    expect(
      searchNodeEverywhere(state, '8781492f-91e6-46ca-b2a6-b34f2e54fac6').node
        .id,
      'to equal',
      '8781492f-91e6-46ca-b2a6-b34f2e54fac6'
    )
  })
})
