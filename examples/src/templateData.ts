// tslint:disable:max-line-length
const emptyTemplate = {
    name: 'Empty',
    getEditorState: () => ({
        'id': '1',
        'cells': [
            {
                'inline': null,
                'size': 12,
                'rows': [
                    {
                        'cells': [
                            {
                                'inline': null,
                                'size': 12,
                                'content': {
                                    'plugin': {
                                        'name': 'ory/editor/core/content/slate',
                                        'version': '0.0.2',
                                    },
                                    'state': {
                                        'serialized': {
                                            'object': 'value',
                                            'document': {
                                                'object': 'document',
                                                'data': {},
                                                'nodes': [
                                                    {
                                                        'object': 'block',
                                                        'type': 'PARAGRAPH/PARAGRAPH',
                                                        'isVoid': false,
                                                        'data': {},
                                                        'nodes': [
                                                            {
                                                                'object': 'text',
                                                                'leaves': [
                                                                    {
                                                                        'object': 'leaf',
                                                                        'text': '',
                                                                        'marks': [],
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    }),
    description: '',
};

const contentHomePageTemplates = [
    emptyTemplate, {
        name: 'Basic',
        getEditorState: () => ({
            'id': '1',
            'cells': [
                {
                    'id': '354c82bf-9ba6-4be5-9b4b-60ed0139e939',
                    'inline': null,
                    'size': 12,
                    'rows': [
                        {
                            'id': 'f20c2845-042d-423f-b37d-76db1be37fa0',
                            'cells': [
                                {
                                    'id': '0cba088e-7380-49f0-bfaf-a425dec80b5f',
                                    'inline': null,
                                    'size': 12,
                                    'layout': {
                                        'plugin': {
                                            'name': 'ory/editor/core/layout/background',
                                            'version': '0.0.1',
                                        },
                                        'state': {
                                            'darken': 0.42,
                                            'modeFlag': 1,
                                            'backgroundColor': {
                                                'r': 16,
                                                'g': 189,
                                                'b': 199,
                                                'a': 1,
                                            },
                                            'background': 'https://static.guestbell.com/img/content-templates/1/main.jpg',
                                        },
                                    },
                                    'rows': [
                                        {
                                            'id': 'c4901d92-8e5e-4c0d-8e8e-389dc40e8b00',
                                            'cells': [
                                                {
                                                    'id': '3de0a41e-4d8c-49b1-9dd7-0d4bf4677bc2',
                                                    'inline': null,
                                                    'size': 12,
                                                    'content': {
                                                        'plugin': {
                                                            'name': 'ory/editor/core/content/slate',
                                                            'version': '0.0.2',
                                                        },
                                                        'state': {
                                                            'serialized': {
                                                                'object': 'value',
                                                                'document': {
                                                                    'object': 'document',
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'block',
                                                                            'type': 'HEADINGS/HEADING-ONE',
                                                                            'isVoid': false,
                                                                            'data': {
                                                                                'align': 'center',
                                                                            },
                                                                            'nodes': [
                                                                                {
                                                                                    'object': 'text',
                                                                                    'leaves': [
                                                                                        {
                                                                                            'object': 'leaf',
                                                                                            'text': '',
                                                                                            'marks': [],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                        {
                                                                            'object': 'block',
                                                                            'type': 'HEADINGS/HEADING-ONE',
                                                                            'isVoid': false,
                                                                            'data': {
                                                                                'align': 'center',
                                                                            },
                                                                            'nodes': [
                                                                                {
                                                                                    'object': 'text',
                                                                                    'leaves': [
                                                                                        {
                                                                                            'object': 'leaf',
                                                                                            'text': '',
                                                                                            'marks': [],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                        {
                                                                            'object': 'block',
                                                                            'type': 'HEADINGS/HEADING-ONE',
                                                                            'isVoid': false,
                                                                            'data': {
                                                                                'align': 'center',
                                                                            },
                                                                            'nodes': [
                                                                                {
                                                                                    'object': 'text',
                                                                                    'leaves': [
                                                                                        {
                                                                                            'object': 'leaf',
                                                                                            'text': 'property.name',
                                                                                            'marks': [],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                        {
                                                                            'object': 'block',
                                                                            'type': 'HEADINGS/HEADING-FOUR',
                                                                            'isVoid': false,
                                                                            'data': {
                                                                                'align': 'center',
                                                                            },
                                                                            'nodes': [
                                                                                {
                                                                                    'object': 'text',
                                                                                    'leaves': [
                                                                                        {
                                                                                            'object': 'leaf',
                                                                                            'text': 'Sample Text',
                                                                                            'marks': [],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                        {
                                                                            'object': 'block',
                                                                            'type': 'HEADINGS/HEADING-ONE',
                                                                            'isVoid': false,
                                                                            'data': {
                                                                                'align': 'center',
                                                                            },
                                                                            'nodes': [
                                                                                {
                                                                                    'object': 'text',
                                                                                    'leaves': [
                                                                                        {
                                                                                            'object': 'leaf',
                                                                                            'text': '',
                                                                                            'marks': [],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                        {
                                                                            'object': 'block',
                                                                            'type': 'HEADINGS/HEADING-ONE',
                                                                            'isVoid': false,
                                                                            'data': {
                                                                                'align': 'center',
                                                                            },
                                                                            'nodes': [
                                                                                {
                                                                                    'object': 'text',
                                                                                    'leaves': [
                                                                                        {
                                                                                            'object': 'leaf',
                                                                                            'text': '',
                                                                                            'marks': [],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            'id': '47ae8705-89d8-48e7-b5a9-f1517b095f91',
                            'cells': [
                                {
                                    'id': '147f7563-c762-4500-9f30-de0f2a114d4b',
                                    'inline': null,
                                    'size': 12,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FIVE',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': `For business or leisure, the ${'property.name'} is a unique destination offering an extensive range\r of product and services to its guests.`,
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            'id': 'f51dbd71-d70c-4e5b-aa4d-f9bf2e0a4702',
                            'cells': [
                                {
                                    'id': '003f6f38-997a-4851-910e-9983360db665',
                                    'inline': null,
                                    'size': 12,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FOUR',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Location:',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': ' ',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'PARAGRAPH/PARAGRAPH',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Labore maiorum fabellas in vel. Eum te quod percipit conceptam, ad has lorem nulla viris. Accusata persecuti nam ad. Vel sumo ubique ut, audire patrioque ius no, ea detraxit menandri petentium mei.\r Habeo persequeris vim ut, duo sint blandit oportere ut. Has cu aperiri accusam. Ius diceret pericula moderatius te.',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            'id': 'f55588f0-b564-436c-bcdd-dc42a5939213',
                            'cells': [
                                {
                                    'id': 'ca7baf94-1054-44f9-8ab6-5809676ee60f',
                                    'inline': null,
                                    'size': 12,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FOUR',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Amenities:',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Template Restaurant 1 - ',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'In voluptua accusata vel. Graece petentium constituam nam cu, cum an ullum velit. Eros verterem eam ad, error tractatos eam eu, consulatu maiestatis adolescens usu ne. Te has probo salutatus. ',
                                                                                    'marks': [],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Serves Breakfast from 8 am to 11 am.',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/UNORDERED-LIST',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'block',
                                                                            'type': 'LISTS/LIST-ITEM',
                                                                            'isVoid': false,
                                                                            'data': {},
                                                                            'nodes': [
                                                                                {
                                                                                    'object': 'text',
                                                                                    'leaves': [
                                                                                        {
                                                                                            'object': 'leaf',
                                                                                            'text': 'Opening hours: ',
                                                                                            'marks': [
                                                                                                {
                                                                                                    'object': 'mark',
                                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                                    'data': {},
                                                                                                },
                                                                                            ],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                        {
                                                                            'object': 'block',
                                                                            'type': 'LISTS/UNORDERED-LIST',
                                                                            'isVoid': false,
                                                                            'data': {},
                                                                            'nodes': [
                                                                                {
                                                                                    'object': 'block',
                                                                                    'type': 'LISTS/LIST-ITEM',
                                                                                    'isVoid': false,
                                                                                    'data': {},
                                                                                    'nodes': [
                                                                                        {
                                                                                            'object': 'text',
                                                                                            'leaves': [
                                                                                                {
                                                                                                    'object': 'leaf',
                                                                                                    'text': 'Monday - Friday:  00:00 - 00:00',
                                                                                                    'marks': [
                                                                                                        {
                                                                                                            'object': 'mark',
                                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                                            'data': {},
                                                                                                        },
                                                                                                    ],
                                                                                                },
                                                                                            ],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'block',
                                                                                    'type': 'LISTS/LIST-ITEM',
                                                                                    'isVoid': false,
                                                                                    'data': {},
                                                                                    'nodes': [
                                                                                        {
                                                                                            'object': 'text',
                                                                                            'leaves': [
                                                                                                {
                                                                                                    'object': 'leaf',
                                                                                                    'text': 'Sunday - Saturday: 00:00 - 00:00',
                                                                                                    'marks': [
                                                                                                        {
                                                                                                            'object': 'mark',
                                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                                            'data': {},
                                                                                                        },
                                                                                                    ],
                                                                                                },
                                                                                            ],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Template Restaurant 2 - ',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'In voluptua accusata vel. Graece petentium constituam nam cu, cum an ullum velit. Eros verterem eam ad, error tractatos eam eu, consulatu maiestatis adolescens usu ne. Te has probo salutatus.  ',
                                                                                    'marks': [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/UNORDERED-LIST',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'block',
                                                                            'type': 'LISTS/LIST-ITEM',
                                                                            'isVoid': false,
                                                                            'data': {},
                                                                            'nodes': [
                                                                                {
                                                                                    'object': 'text',
                                                                                    'leaves': [
                                                                                        {
                                                                                            'object': 'leaf',
                                                                                            'text': ' Serves:',
                                                                                            'marks': [
                                                                                                {
                                                                                                    'object': 'mark',
                                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                                    'data': {},
                                                                                                },
                                                                                            ],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                        {
                                                                            'object': 'block',
                                                                            'type': 'LISTS/UNORDERED-LIST',
                                                                            'isVoid': false,
                                                                            'data': {},
                                                                            'nodes': [
                                                                                {
                                                                                    'object': 'block',
                                                                                    'type': 'LISTS/LIST-ITEM',
                                                                                    'isVoid': false,
                                                                                    'data': {},
                                                                                    'nodes': [
                                                                                        {
                                                                                            'object': 'text',
                                                                                            'leaves': [
                                                                                                {
                                                                                                    'object': 'leaf',
                                                                                                    'text': 'Lunch:  00:00 - 00:00',
                                                                                                    'marks': [
                                                                                                        {
                                                                                                            'object': 'mark',
                                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                                            'data': {},
                                                                                                        },
                                                                                                    ],
                                                                                                },
                                                                                            ],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'block',
                                                                                    'type': 'LISTS/LIST-ITEM',
                                                                                    'isVoid': false,
                                                                                    'data': {},
                                                                                    'nodes': [
                                                                                        {
                                                                                            'object': 'text',
                                                                                            'leaves': [
                                                                                                {
                                                                                                    'object': 'leaf',
                                                                                                    'text': 'Dinner: 00:00 - 00:00',
                                                                                                    'marks': [
                                                                                                        {
                                                                                                            'object': 'mark',
                                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                                            'data': {},
                                                                                                        },
                                                                                                    ],
                                                                                                },
                                                                                            ],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Template Cafe - ',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'In oporteat intellegat mel, in sed veritus facilisis. Vim alii putant suscipit no, agam mundi animal ut eos. At nec quot aeque habemus. Vivendo oportere duo id, prima libris ut mea. Quot delectus legendos sed ea.',
                                                                                    'marks': [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Template Bar - ',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Eu probo reque iisque eos odio dignissim evertitur id cum. Essent tibique sea ut. Ut eirmod pericula signiferumque usu, ad pri probo elitr. Usu no labore forensibus.',
                                                                                    'marks': [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Template Spa & Massage - ',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Civibus officiis id duo feugiat pertinax ad vix. Sit ei dolores persecuti, per cu mollis aliquip meliore. Illud clita cu eum, cum omnium dolores expetenda at, malis utinam inimicus id usu. Pri an labore possim, ut primis ponderum insolens mei.',
                                                                                    'marks': [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Swimming Pool - ',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Vivendo oportere duo id prima libris ut mea. Quot delectus legendos sed ea.',
                                                                                    'marks': [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            'id': '4ab3bbfa-71ba-4b61-9751-4df198041a17',
                            'cells': [
                                {
                                    'id': '0e54336a-1c9e-426b-a014-effd42478117',
                                    'inline': null,
                                    'size': 12,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FOUR',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Complimentary Services: ',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Wifi - ',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Eu probo reque iisque eos, odio dignissim evertitur id cum. Essent tibique sea ut.',
                                                                                    'marks': [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Tea & Bottled water - ',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'In pri quod laboramus disputando. Nostrud sanctus accommodare no sed, noster volumus intellegebat ut has. ',
                                                                                    'marks': [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Wake up - ',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Usu atqui assum legendos cu, te solum melius patrioque has, usu esse nulla tempor et. ',
                                                                                    'marks': [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Newspaper -',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': ' Cu porro iisque tibique ius, duo ad dicit evertitur incorrupte.',
                                                                                    'marks': [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Umbrellas for use during inclement weather - ',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Civibus officiis id duo, feugiat pertinax ad vix. Sit ei dolores persecuti, per cu mollis aliquip meliore. Illud clita cu eum, cum omnium dolores expetenda at, malis utinam inimicus id usu. Pri an labore possim, ut primis ponderum insolens mei.',
                                                                                    'marks': [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            'id': 'c4c428ff-b43a-4733-971d-7bdd507374f2',
                            'cells': [
                                {
                                    'id': 'a4d67b62-c1a7-4d07-b022-e019e4a2bf79',
                                    'inline': null,
                                    'size': 12,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FOUR',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Additional Services: ',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Late Check Out - ',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Eu probo reque iisque eos, odio dignissim evertitur id cum. Essent tibique sea ut.',
                                                                                    'marks': [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Laundry & Ironing - ',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'In pri quod laboramus disputando. Nostrud sanctus accommodare no sed, noster volumus intellegebat ut has. ',
                                                                                    'marks': [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Shuttle - ',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Usu atqui assum legendos cu, te solum melius patrioque has, usu esse nulla tempor et. ',
                                                                                    'marks': [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'LISTS/UNORDERED-LIST',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'block',
                                                                    'type': 'LISTS/LIST-ITEM',
                                                                    'isVoid': false,
                                                                    'data': {},
                                                                    'nodes': [
                                                                        {
                                                                            'object': 'text',
                                                                            'leaves': [
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': 'Renting bicycles -',
                                                                                    'marks': [
                                                                                        {
                                                                                            'object': 'mark',
                                                                                            'type': 'EMPHASIZE/STRONG',
                                                                                            'data': {},
                                                                                        },
                                                                                    ],
                                                                                },
                                                                                {
                                                                                    'object': 'leaf',
                                                                                    'text': ' Duo autem nihil choro ex, vis in lorem libris melius. Vel magna cetero ocurreret cu, alia vivendo et eos. Mei ne homero graeci petentium, te ferri graece adversarium quo. Consul iisque consequat ut pro.',
                                                                                    'marks': [],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            'id': '2aaa1036-437e-43ec-bd25-6c75ed57dedc',
                            'cells': [
                                {
                                    'id': '88d95d44-0f2a-421d-9664-100c92aa7dcc',
                                    'inline': null,
                                    'size': 12,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/divider',
                                            'version': '0.0.1',
                                        },
                                        'state': {},
                                    },
                                },
                            ],
                        },
                        {
                            'id': 'e697c62f-6dab-48e1-bab9-c4ff3a2dbecb',
                            'cells': [
                                {
                                    'id': '04539007-3367-49d7-8f79-149a93d9d046',
                                    'inline': null,
                                    'size': 12,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FOUR',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Activities',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            'id': 'c0bce231-90f3-4c07-ae56-f3ab398916b4',
                            'cells': [
                                {
                                    'id': 'e568bf33-62ef-47ac-8554-53594cf82c63',
                                    'inline': null,
                                    'size': 4,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FIVE',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Water Sports',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'PARAGRAPH/PARAGRAPH',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Case brute definitionem ei qui, has ut aliquam expetendis concludaturque, ut eos eirmod ornatus prodesset.  Et quidam facete vel, postea indoctum id nam.',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                                {
                                    'id': '539b7e09-9a38-4d61-b98d-21ac9f07dd0b',
                                    'inline': null,
                                    'size': 4,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FIVE',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Diving',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'PARAGRAPH/PARAGRAPH',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Atqui sententiae ne pri, eu has mucius appareat. Praesent iracundia dissentiet ea mel, te ridens verear regione vim.  Te pertinax invenire principes sed. Ex vim graeco insolens consetetur.',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                                {
                                    'id': '92f60852-61e4-4301-9747-6dfa1134a110',
                                    'inline': null,
                                    'size': 4,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FIVE',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Tenis',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'PARAGRAPH/PARAGRAPH',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Atqui sententiae ne pri, eu has mucius appareat. Praesent iracundia dissentiet ea mel, te ridens verear regione vim. Ad has nullam equidem similique, ius enim vide ea, menandri splendide ut est. ',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            'id': '2d69f156-541a-4727-ac2a-a79053fb589e',
                            'cells': [
                                {
                                    'id': 'cf9e247f-0fc2-4e69-89d7-a1c793129f50',
                                    'inline': null,
                                    'size': 4,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FIVE',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Golf',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'PARAGRAPH/PARAGRAPH',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Case brute definitionem ei qui, has ut aliquam expetendis concludaturque, ut eos eirmod ornatus prodesset.  Id nostrum oportere vis, nam et tale illum etiam. Et quidam facete vel, postea indoctum id nam.',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                                {
                                    'id': '56fe46d0-27f1-479c-97ff-5921743989c0',
                                    'inline': null,
                                    'size': 4,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FIVE',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Tours',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'PARAGRAPH/PARAGRAPH',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Case brute definitionem ei qui, has ut aliquam expetendis concludaturque, ut eos eirmod ornatus prodesset.  Nam et tale illum etiam. Et quidam facete vel, postea indoctum id nam.',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                                {
                                    'id': '755473bf-fd17-4e81-bf9a-df662fcb5b1d',
                                    'inline': null,
                                    'size': 4,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FIVE',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Wine tasting',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'PARAGRAPH/PARAGRAPH',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Duo ut veritus intellegebat. Id nostrum oportere vis, nam et tale illum etiam. Et quidam facete vel, postea indoctum id nam.',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            'id': '3b791e04-2a0b-4e6d-b358-f6dcf27cb75b',
                            'cells': [
                                {
                                    'id': '4458ecbe-f6df-46ad-81bf-ba3137eb9fae',
                                    'inline': null,
                                    'size': 12,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/divider',
                                            'version': '0.0.1',
                                        },
                                        'state': {},
                                    },
                                },
                            ],
                        },
                        {
                            'id': '6be3c3d5-5ee7-499c-b684-0a023b0cf08a',
                            'cells': [
                                {
                                    'id': '8e89547a-74b5-48e4-8f4f-943a47c4a03f',
                                    'inline': null,
                                    'size': 12,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FOUR',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Useful information',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            'id': '03f2363a-ee61-49c6-bb5f-62f0317d40cf',
                            'cells': [
                                {
                                    'id': 'f16260a7-70d4-43ae-b4f8-e0f6daa6ca00',
                                    'inline': null,
                                    'size': 6,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FIVE',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Check-in and Check-out',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'PARAGRAPH/PARAGRAPH',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'At aliquip antiopam deterruisset qui, ad purto facilis mea. Sit eu eligendi contentiones, eam congue eligendi reprimique cu. ',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                                {
                                    'id': '2375e43b-2344-4f12-846e-4c2f6756ceab',
                                    'inline': null,
                                    'size': 6,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FIVE',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Weather',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'PARAGRAPH/PARAGRAPH',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Dico liber cu eos, quem adipisci patrioque pro cu, oratio nostrud nam at. An has aeque accusata vituperatoribus, te usu scripta patrioque interpretaris. Vel te suas electram disputando. Agam postea admodum et sea.',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            'id': '5f5f45ac-634d-4918-9a73-eabbd9056ec9',
                            'cells': [
                                {
                                    'id': '852674f5-14f3-4038-a69a-06b7199b2ec1',
                                    'inline': null,
                                    'size': 6,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FIVE',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Currency',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'PARAGRAPH/PARAGRAPH',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'At aliquip antiopam deterruisset qui, ad purto facilis mea. Sit eu eligendi contentiones, eam congue eligendi reprimique cu. ',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                                {
                                    'id': 'c600b827-9258-4a54-9fe3-ec67969afaae',
                                    'inline': null,
                                    'size': 6,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FIVE',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Electricity',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'PARAGRAPH/PARAGRAPH',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'At aliquip antiopam deterruisset qui, ad purto facilis mea. Sit eu eligendi contentiones, eam congue eligendi reprimique cu. ',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            'id': 'd268f4d3-90de-4b77-ab2c-16cf9725e641',
                            'cells': [
                                {
                                    'id': '0a4963d1-d57a-4965-89c7-b001e8b76798',
                                    'inline': null,
                                    'size': 12,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FIVE',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Passport & Visa',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            'object': 'block',
                                                            'type': 'PARAGRAPH/PARAGRAPH',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Ex omittam atomorum usu, qui cetero atomorum forensibus cu. Quas novum congue vel cu, ex pri tation euripidis constituam. Amet dicit convenire has ea. At sumo concludaturque mea, eos ex facete option recusabo.',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            'id': 'b7f028ce-2a4e-46f9-8a76-5d085755c62d',
                            'cells': [
                                {
                                    'id': '70ec9588-0812-477f-ab9c-4019285fed0b',
                                    'inline': null,
                                    'size': 12,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'HEADINGS/HEADING-FOUR',
                                                            'isVoid': false,
                                                            'data': {
                                                                'align': 'center',
                                                            },
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Social media',
                                                                            'marks': [
                                                                                {
                                                                                    'object': 'mark',
                                                                                    'type': 'EMPHASIZE/STRONG',
                                                                                    'data': {},
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            'id': '10b55244-f7e0-4ece-9e8d-ef1b04f6a2e9',
                            'cells': [
                                {
                                    'id': '04390542-dd67-4baf-837b-8b14202c7818',
                                    'inline': null,
                                    'size': 3,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/spacer',
                                            'version': '0.0.1',
                                        },
                                        'state': {},
                                    },
                                },
                                {
                                    'id': 'fe941dd6-ebb2-4f5b-bc58-2ab8d8fd072e',
                                    'inline': null,
                                    'size': 2,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/image',
                                            'version': '0.0.1',
                                        },
                                        'state': {
                                            'src': 'https://static.guestbell.com/img/content-templates/shared/facebook.png',
                                        },
                                    },
                                },
                                {
                                    'id': '56b08f24-d81c-4f73-a9d9-2dc8dd1b5f87',
                                    'inline': null,
                                    'size': 2,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/image',
                                            'version': '0.0.1',
                                        },
                                        'state': {
                                            'src': 'https://static.guestbell.com/img/content-templates/shared/twitter.png',
                                        },
                                    },
                                },
                                {
                                    'id': 'adabd3fd-072f-4e31-a219-1574af760d78',
                                    'inline': null,
                                    'size': 2,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/image',
                                            'version': '0.0.1',
                                        },
                                        'state': {
                                            'src': 'https://static.guestbell.com/img/content-templates/shared/instagram.png',
                                        },
                                    },
                                },
                                {
                                    'id': 'f9cb36d2-d9b7-49f1-abe0-4a0f527749a2',
                                    'inline': null,
                                    'size': 3,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/spacer',
                                            'version': '0.0.1',
                                        },
                                        'state': {},
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        }),
        description: 'Standard template used by most properties',
    }, {
        name: 'Modern',
        getEditorState: () => ({
            'id': '1',
            'cells': [
                {
                    'inline': null,
                    'size': 12,
                    'rows': [
                        {
                            'cells': [
                                {
                                    'inline': null,
                                    'size': 12,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'PARAGRAPH/PARAGRAPH',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Modern',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        }),
        description: 'Modern template used by most properties',
    }, {
        name: 'Fancy',
        getEditorState: () => ({
            'id': '1',
            'cells': [
                {
                    'inline': null,
                    'size': 12,
                    'rows': [
                        {
                            'cells': [
                                {
                                    'inline': null,
                                    'size': 12,
                                    'content': {
                                        'plugin': {
                                            'name': 'ory/editor/core/content/slate',
                                            'version': '0.0.2',
                                        },
                                        'state': {
                                            'serialized': {
                                                'object': 'value',
                                                'document': {
                                                    'object': 'document',
                                                    'data': {},
                                                    'nodes': [
                                                        {
                                                            'object': 'block',
                                                            'type': 'PARAGRAPH/PARAGRAPH',
                                                            'isVoid': false,
                                                            'data': {},
                                                            'nodes': [
                                                                {
                                                                    'object': 'text',
                                                                    'leaves': [
                                                                        {
                                                                            'object': 'leaf',
                                                                            'text': 'Fancy',
                                                                            'marks': [],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        }),
        description: 'Fancy template used by most properties',
    }];

export { contentHomePageTemplates, emptyTemplate };