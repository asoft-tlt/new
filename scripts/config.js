window.App || (window.App = {});

/**
 * Config for pages
 */
window.App.sections = [
  /*  {
   id: 1,
        name: 'Predislovie',
        pages: [
            {
                id: 1,
                type: 'page',
                template: 'page1.html'
            },
            // {
            //     id: 2,
            //     type: 'video',
            //     video: 'intro.mp4'
            // },
            {
                id: 3,
                type: 'page',
                template: 'page3.html',
                slides: [
                    {
                        image: '3_1.jpg',
                        description: 'Антиохия на Оронте',
                        positions: {
                            left: '-314px',
                            top: '0px'
                        },
                        sounds: [
                            {title: 'Антиохия на Оронте', mp3: '2.1.mp3'}
                        ],
                        map: 'true'
                    },
                    {
                        image: '3_2.jpg',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        sounds: [
                            {title: '', mp3: '2.2.mp3'}
                        ]
                    },
                    {
                        image: '3_3.jpg',
                        positions: {
                            left: '-272px',
                            top: '0px'
                        },
                        map: 'true',
                        sounds: [
                            {title: '', mp3: '2.3.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 4,
                type: 'page',
                template: 'page4.html'
            },
            {
                id: 5,
                type: 'page',
                template: 'page5.html',
                slides: [
                    {
                        image: '5_1.jpg',
                        description: 'Фрагмент дамаскской рукописи <br/>архидиакона Павла',
                        positions: {
                            left: '-248px',
                            top: '-69px'
                        }
                    }
                ]
            },
            {
                id: 6,
                type: 'page',
                template: 'page6.html'
            },
            {
                id: '7-1',
                type: 'rubric',
                images: [
                    {"id": "01", "year": 1600}, {
                        "id": "02",
                        "year": 1600,
                        sounds: [{title: '1', mp3: '2.1.mp3'}, {title: '2', mp3: '2.2.mp3'}, {title: '3', mp3: '2.3.mp3'}],
                        map: 'true'
                    }, {"id": "03", "year": 1604},
                    {"id": "04", "year": 1605, sounds: [{title: '', mp3: '4.mp3'}]},
                    {"id": "05", "year": 1605, sounds: [{title: '', mp3: '5.mp3'}]},
                    {"id": "06", "year": 1605},
                    {"id": "07", "year": 1606, sounds: [{title: '', mp3: '7.mp3'}]},
                    {"id": "08", "year": 1606, sounds: [{title: '', mp3: '8.mp3'}]},
                    {"id": "09", "year": 1607},
                    {"id": "10", "year": 1608, sounds: [{title: '', mp3: '10.mp3'}]},
                    {"id": "11", "year": 1611},
                    {"id": "12", "year": 1612},
                    {"id": "13", "year": 1613},
                    {"id": "14", "year": 1617, sounds: [{title: '1', mp3: '14.1.mp3'}, {title: '2', mp3: '14.2.mp3'}]},
                    {"id": "15", "year": 1618, sounds: [{title: '', mp3: '15.mp3'}]},
                    {"id": "16", "year": 1619},
                    {"id": "17", "year": 1619, sounds: [{title: '1', mp3: '17.1.mp3'}, {title: '2', mp3: '17.2.mp3'}]},
                    {"id": "18", "year": 1620},
                    {"id": "19", "year": 1624},
                    {"id": "20", "year": 1624, sounds: [{title: '', mp3: '20.mp3'}]},
                    {"id": "21", "year": 1625},
                    {"id": "22", "year": 1626},
                    {"id": "23", "year": 1628, sounds: [{title: '', mp3: '23.mp3'}]},
                    {"id": "24", "year": 1637, sounds: [{title: '', mp3: '24.mp3'}]},
                    {"id": "25", "year": 1638},
                    {"id": "25_1", "year": 1638},
                    {"id": "25_2", "year": 1638},
                    {"id": "26", "year": 1641},
                    {"id": "27", "year": 1642},
                    {"id": "28", "year": 1642, sounds: [{title: '', mp3: '28.mp3'}]},
                    {"id": "29", "year": 1643, sounds: [{title: '1', mp3: '29.1.mp3'}, {title: '2', mp3: '29.2.mp3'}]},
                    {"id": "30", "year": 1644},
                    {"id": "31", "year": 1644},
                    {"id": "31_1", "year": 1644},
                    {"id": "31_2", "year": 1644},
                    {"id": "31_3", "year": 1644},
                    {"id": "31_4", "year": 1644},
                    {"id": "31_5", "year": 1644},
                    {"id": "31_6", "year": 1644},
                    {"id": "31_7", "year": 1644},
                    {"id": "31_8", "year": 1644},
                    {"id": "31_9", "year": 1644},
                    {"id": "32", "year": 1645},
                    {"id": "33", "year": 1648},
                    {"id": "34", "year": 1648},
                    {"id": "35", "year": 1648, sounds: [{title: '', mp3: '35.mp3'}]},
                    {"id": "36", "year": 1649, sounds: [{title: '1', mp3: '36.1.mp3'}, {title: '2', mp3: '36.2.mp3'}, {title: '3', mp3: '36.3.mp3'}]},
                    {"id": "37", "year": 1649},
                    {"id": "38", "year": 1650},
                    {"id": "39", "year": 1650},
                    {"id": "40", "year": 1650,
                      sounds: [{title: '1', mp3: '40.1.mp3'},
                               {title: '2', mp3: '40.2.mp3'},
                               {title: '3', mp3: '40.3.mp3'},
                               {title: '4', mp3: '40.4.mp3'},
                               {title: '5', mp3: '40.5.mp3'},
                               {title: '6', mp3: '40.6.mp3'},
                               {title: '7', mp3: '40.7.mp3'}]
                    },
                    {"id": "41", "year": 1652, sounds: [{title: '', mp3: '41.mp3'}]},
                    {"id": "42", "year": 1652},
                    {"id": "43", "year": 1652},
                    {"id": "44", "year": 1653, sounds: [{title: '', mp3: '44.mp3'}]},
                    {"id": "45", "year": 1665},
                    {"id": "46", "year": 1665},
                    {"id": "47", "year": 1665},
                    {"id": "48", "year": 1666},
                    {"id": "49", "year": 1668},
                    {"id": "50", "year": 1668},
                    {"id": "51", "year": 1671},
                    {"id": "52", "year": 1675},
                    {"id": "53", "year": 1679, sounds: [{title: '', mp3: '53.mp3'}]},
                    {"id": "54", "year": 1682},
                    {"id": "55", "year": 1683},
                    {"id": "56", "year": 1683},
                    {"id": "57", "year": 1689},
                    {"id": "58", "year": 1699},
                    {"id": "59", "year": 1699, sounds: [{title: '', mp3: '59.mp3'}]}
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Vstuplenie',
        pages: [
          // {
          //       id: 8,
          //       type: 'video',
          //       video: 'vstup.mp4'
          //   },
            {
                id: 9,
                type: 'page',
                template: 'page9.html',
                slides: [
                    {
                        image: '9.jpg',
                        positions: {
                            left: '-534px',
                            top: '0px'
                        },
                        description: 'Павел Алепский',
                        map: 'true'
                    }
                ]
            },
            {
                id: 10,
                type: 'page',
                template: 'page10.html',
                slides: [
                    {
                        image: '10_1.jpg',
                        positions: {
                            left: '-577px',
                            top: '0px'
                        },
                        description: 'Древняя Сирия',
                        sounds: [
                            {title: '', mp3: '4.1.mp3'}
                        ]
                    },
                    {
                        image: '10_2.jpg',
                        positions: {
                            left: '-481px',
                            top: '0px'
                        },
                        description: 'Руины города Баальбек',
                        sounds: [
                            {title: '', mp3: '4.2.mp3'}
                        ],
                        map: 'true'
                    }
                ]
            },
            {
                id: 11,
                type: 'page',
                template: 'page11.html',
                slides: [
                    {
                        image: '11.jpg',
                        positions: {
                            left: '-106px',
                            top: '-277px'
                        }
                    }
                ]
            },
            {
                id: 12,
                type: 'page',
                template: 'page12.html',
                scalable: 'no'//'yes',
        //       slides: [
        //   {
        //     image: '12_1.png'
        //   },
        //   {
        //     image: '12_2.png'
        //   },
        //   {
        //     image: '12_3.png'
        //   }
        // ]
            },
      //   {
      //   id: 200,
      //   type: 'page',
      //   template: 'page200.html',
      //   slides: [
      //     {
      //       image: '200_1.jpg',
      //       sounds: [
      //         {title: '', mp3: '200_1.mp3'}
      //       ]
      //     },
      //     {
      //       image: '200_2.jpg',
      //       sounds: [
      //         {title: '', mp3: '200_2.mp3'}
      //       ]
      //     }
      //   ]
      // },
            {
                id: 13,
                type: 'page',
                template: 'page13.html'
            },
            {
                id: '14-2',
                type: 'rubric_slider',
                sounds: {title: '', mp3: '3_2.mp3'},
                images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(function (number) {
                    return {
                        image: number + '.jpg'
                    }
                })
            }
        ]
    },

    {
        id: 3,
        name: 'Glava1',
        pages: [
        //    {
        //         id: 15,
        //         type: 'video',
        //         video: 'intro.mp4'
        //     },
            {
                id: 16,
                type: 'page',
                template: 'page16.html',

                slides: [
                    {
                        image: '16_1.jpg',
                        positions: {
                            left: '0px',
                            top: '-204px'
                        },
                        sounds: [
                            {title: '', mp3: '2.1.mp3'}
                        ],
                        zoom: '170%',
                        map: 'true'
                    },
                    {
                        image: '16_2.jpg',
                        positions: {
                            left: '0px',
                            top: '-220px'
                        },
                        zoom: '169.5%',
                        sounds: [
                            {title: '', mp3: '2.2.mp3'}
                        ]
                    },
                    {
                        image: '16_3.jpg',
                        positions: {
                            left: '0px',
                            top: '-220px'
                        },
                        zoom: '169.5%',
                        sounds: [
                            {title: '', mp3: '2.3.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 17,
                type: 'page',
                sound: '1.mp3',
                template: 'page17.html',
                slides: [
                    {
                        image: '17_1.jpg',
                        description: 'Малороссия. Ситуация в регионе к началу второй половины 17 века',
                        sounds: [
                            {title: 'Малороссия. Ситуация в регионе к началу второй половины 17 века', mp3: '3.1.mp3'}
                        ]
                    },
                    {
                        image: '17_2.jpg',
                        description: 'Во власти бандитского племеник',
                        sounds: [
                            {title: '', mp3: '3.2.mp3'}
                        ]
                    },
                    {
                        image: '17_3.jpg',
                        description: 'Литва. Великое православное княжество',
                        sounds: [
                            {title: 'Литва. Великое православное княжество', mp3: '3.3.mp3'}
                        ]
                    },
                    {
                        image: '17_4.jpg',
                        sounds: [
                            {title: '', mp3: '3.4.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 18,
                type: 'page',
                template: 'page18.html',
                slides: [
                    {
                        image: '18_1.jpg',
                        positions: {
                            left: '-10px',
                            top: '-180px'
                        },
                        zoom: '164.5%',
                        sounds: [
                            {title: '', mp3: '4.1.mp3'}
                        ]
                    },
                    {
                        image: '18_2.jpg',
                        positions: {
                            left: '0px',
                            top: '-96px'
                        },
                        zoom: '162%',
                        sounds: [
                            {title: '', mp3: '4.2.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 19,
                type: 'page',
                template: 'page19.html',
                slides: [
                    {
                        image: '19_1.jpg',
                        description: '',
                        positions: {
                            left: '-92px',
                            top: '-0px'
                        },
                        zoom: '104%',
                        sounds: [
                            {title: 'Кто такие казаки', mp3: '5.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 20,
                type: 'page',
                template: 'page20.html',
                slides: [
                    {
                        image: '20.jpg',
                      //  description: 'Биография гетмана. Традиционная версия.',
                        positions: {
                            left: '-370px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: '', mp3: '6.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 21,
                type: 'page',
                template: 'page21.html',
                sounds: [
                    {title: 'Западная Русь до XVII века, предыстория событий', mp3: '7.1.mp3'}
                ]
            },
            {
                id: 215,
                type: 'page',
                template: 'page215.html',
                scalable: 'yes',
                slides: [
                    {
                        image: '7.2.jpg',
                        description: 'Рождение Литовской державы',
                        sounds: [
                            {title: 'Рождение Литовской державы', mp3: '7.2.mp3'}
                        ]
                    },
                    {
                        image: '7.3.jpg',
                      //  description: 'Ян Вильчинский. Каменец-Подольский',
                        sounds: [
                            {title: '', mp3: '7.3.mp3'}
                        ]
                    },
                    {
                        image: '7.4.jpg',
                        //description: ' Ян Вильчинский. Волынь',
                        sounds: [
                            {title: '', mp3: '7.4.mp3'}
                        ]
                    },
                    {
                        image: '7.5.jpg',
                      //  description: ' Ян Вильчинский. Костёл Святой Троицы в Кракове',
                        sounds: [
                            {title: '', mp3: '7.5.mp3'}
                        ]
                    }
                ]
            },

            {
                id: 22,
                type: 'page',
                template: 'page22.html',
                slides: [
                    {
                        image: '22.jpg',
                        positions: {
                            left: '-69px',
                            top: '0px'
                        },
                        zoom: '100%',
                        sounds: [
                            {title: '', mp3: '8.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 23,
                type: 'page',
                template: 'page23.html',
                slides: [
                    {
                        image: '23_1.jpg',
                        sounds: [
                            {title: 'Западная Русь до 17 века. Продолжение', mp3: '9.1.mp3'}
                        ]
                    },
                    {
                        image: '23_2.jpg',
                        sounds: [
                            {title: 'Грюнвальдская битва', mp3: '9.2.mp3'}
                        ]
                    },
                    {
                        image: '23_3.jpg',
                        sounds: [
                            {title: 'Люблинская уния 1659 года', mp3: '9.3.mp3'}
                        ]
                    },
                    {
                        image: '23_4.jpg',
                        sounds: [
                            {title: '', mp3: '9.4.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 24,
                type: 'page',
                template: 'page24.html',
                slides: [
                    {
                        image: '24_1.jpg',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: 'Подлинная причина казацких восстаний. К сути явления', mp3: '10.1.mp3'}
                        ]
                    },
                    {
                        image: '24_2.jpg',
                        positions: {
                            left: '-300px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: '', mp3: '10.2.mp3'}
                        ]
                    },
                    {
                        image: '24_3.jpg',
                        positions: {
                            left: '-100px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: '', mp3: '10.3.mp3'}
                        ]
                    },
                    {
                        image: '24_4.jpg',
                        positions: {
                            left: '-100px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: '', mp3: '10.4.mp3'}
                        ]
                    },
                    {
                        image: '24_5.jpg',
                        positions: {
                            left: '-200px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: '', mp3: '10.5.mp3'}
                        ]
                    },
                    {
                        image: '24_6.jpg',
                        positions: {
                            left: '-60px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: '', mp3: '10.6.mp3'}
                        ]
                    },
                    {
                        image: '24_7.jpg',
                        positions: {
                            left: '-100px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: '', mp3: '10.7.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 25,
                type: 'page',
                template: 'page25.html'
            },
            {
                id: 26,
                type: 'page',
                template: 'page26.html',
                slides: [
                    {
                        image: '26.jpg',
                        sounds: [
                            {title: 'Смоленская земля - ключ к сердцу России', mp3: '13.2.mp3'}
                        ]

                    }
                ]
            },
            {
                id: 27,
                type: 'page',
                template: 'page27.html',
                slides: [
                    {
                        image: '27_1.jpg',
                        description: 'Польский шляхтич',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        zoom: '100%'
                    },
                    {
                        image: '27_2.jpg',
                        description: 'Стефан Чарнецкий,<br>Заместитель командующего польской армией',
                        positions: {
                            left: '-398px',
                            top: '-21px'
                        },
                        zoom: '105%'
                    },
                    {
                        image: '27_3.jpg',
                        description: 'Станислав Щука,<br> подканцлер Великого Княжества Литовского',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        zoom: '105%'
                    }
                ]
            },
            {
                id: 28,
                type: 'page',
                template: 'page28.html',
                slides: [
                    {
                        image: '28.jpg',
                        positions: {
                            left: '0px',
                            top: '-106px'
                        },
                        sounds: [
                            {title: '', mp3: '15.mp3'}
                        ],
                        zoom: '140%'
                    }
                ]
            },
            {
                id: 29,
                type: 'page',
                template: 'page29.html',
                slides: [
                    {
                        image: '29.jpg',
                        description: 'Русский купец',
                        positions: {
                            left: '0px',
                            top: '-27px'
                        },
                        zoom: '115%'
                    }
                ]
            },
            {
                id: 30,
                type: 'page',
                template: 'page30.html',
                slides: [
                    {
                        image: '30.jpg',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        zoom: '172%',
                        sounds: [
                            {title: '', mp3: '17.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 31,
                type: 'page',
                template: 'page31.html'
            },
            {
                id: 32,
                type: 'page',
                template: 'page32.html'
            },
            {
                id: 33,
                type: 'page',
                template: 'page33.html'
            },
            {
                id: 34,
                type: 'page',
                template: 'page34.html',
                slides: [
                    {
                        image: '34_1.jpg'
                      },
                    {
                        image: '19.2.jpg'
                         ,
                         sounds: [
                             {title: '', mp3: '19.2.mp3'}
                         ]
                    },
                    {
                        image: '19.3.jpg'
                         ,
                         sounds: [
                             {title: '', mp3: '19.3.mp3'}
                         ]
                    }

                ]
            },
            {
                id: 35,
                type: 'page',
                template: 'page35.html',
                slides: [
                    {
                        image: '35_1.jpg',
                        positions: {
                            left: '-432px',
                            top: '0px'
                        },
                        description: 'Турки в мечети Рустема Паши, Стамбул',
                        sounds: [
                            {title: '', mp3: '21.1.mp3'}
                        ]
                    },
                    {
                        image: '35_2.jpg',
                        sounds: [
                            {title: 'Магометане и русские. Что такое имперское поведение', mp3: '21.2.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 37,
                type: 'page',
                template: 'page37.html',
                slides: [
                    {
                        image: '37_1.jpg',
                        scalable: 'yes',
                        sounds: [
                            {title: '', mp3: '23.1.mp3'}
                        ]
                    }
                    // ,
                    // {
                    //     image: '37_2.jpg',
                    //     sounds: [
                    //         {title: '', mp3: '37_2.mp3'}
                    //     ]
                    // },
                    // {
                    //     image: '37_3.jpg',
                    //     sounds: [
                    //         {title: '', mp3: '37_3.mp3'}
                    //     ]
                    // }
                ]
            },
            {
                id: 36,
                type: 'page',
                template: 'page36.html',
                slides: [
                    {
                        image: '36.jpg',
                        map: 'true',
                        sounds: [
                            {title: '', mp3: '23.2.mp3'}
                        ]
                    },
                    {
                        image: '36_2.jpg',
                        sounds: [
                            {title: '', mp3: '23.3.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 38,
                type: 'page',
                template: 'page38.html',
                slides: [
                    {
                        image: '38_1.jpg',
                        positions: {
                            left: '-176px',
                            top: '0px'
                        },
                        zoom: '104%',
                      //  description: 'Россия и Европа. Отношение к смертной казни',
                        sounds: [
                            {title: 'Россия и Европа. Отношение к смертной казни', mp3: '24.1.mp3'}
                        ]
                    },
                    {
                        image: '38_2.jpg',
                        positions: {
                            left: '-200px',
                            top: '0px'
                        },
                        zoom: '100%',
                        sounds: [
                            {title: '', mp3: '24.2.mp3'}
                        ]
                    },
                    {
                        image: '38_3.jpg',
                        positions: {
                            left: '-100px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: '', mp3: '24.3.mp3'}
                        ]
                    },
                    {
                        image: '38_4.jpg',
                        positions: {
                            left: '-100px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: '', mp3: '24.4.mp3'}
                        ]
                    },
                    {
                        image: '38_5.jpg',
                        positions: {
                            left: '-100px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: '', mp3: '24.5.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 39,
                type: 'page',

                template: 'page39.html',
                slides: [
                    {
                        image: '39_1.jpg',
                        positions: {
                            left: '0px',
                            top: '-44px'
                        },
                        zoom: '190%',
                        sounds: [
                            {title: '', mp3: '26.1.mp3'}
                        ]
                    },
                    {
                        image: '39_2.jpg',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        zoom: '188%'
            //              sounds: [
            //   {title: '', mp3: '39_2.mp3'}
            // ]
                    }
                ]
            },
            {
                id: 40,
                type: 'page',
                template: 'page40.html'
            },
            {
                id: 41,
                type: 'page',
                template: 'page41.html',
                slides: [
                    {
                        image: '41.jpg',
                        positions: {
                            left: '0px',
                            top: '-193px'
                        },
                        zoom: '173%',
                        sounds: [
                            {title: '', mp3: '28.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 42,
                type: 'page',
                template: 'page42.html',
                slides: [
                    {
                        image: '42_1.jpg',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: '', mp3: '29.1.mp3'}
                        ]
                    },
                    {
                        image: '42_2.jpg',
                        positions: {
                            left: '-367px',
                            top: '0px'
                        },
                        zoom: '100%'
                    }
                ]
            },
            {
                id: 43,
                type: 'page',
                template: 'page43.html'
            },
            {
                id: 44,
                type: 'page',
                template: 'page44.html',
                slides: [
                    {
                        image: '44.jpg',
                        positions: {
                            left: '-163px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: '', mp3: '31.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 45,
                type: 'page',
                template: 'page45.html',
                slides: [
                    {
                        image: '45.jpg',
                        positions: {
                            left: '-319px',
                            top: '-64px'
                        },
                        zoom: '155%'
                    }
                ]
            },
            {
                id: 46,
                type: 'page',
                template: 'page46.html',
                slides: [
                    {
                        image: '46_1.jpg',
                        positions: {
                            left: '-188px',
                            top: '-87px'
                        },
                        zoom: '112%',
                        sounds: [
                            {title: '', mp3: '33.1.mp3'}
                        ]
                    },
                    {
                        image: '46_2.jpg',
                        positions: {
                            left: '-200px',
                            top: '0px'
                        },
                        sounds: [
                            {title: '', mp3: '33.2.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 47,
                type: 'page',
                template: 'page47.html',
                slides: [
                    {
                        image: '47.jpg',
                        sounds: [
                            {title: '', mp3: '34.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 48,
                type: 'page',
                template: 'page48.html',
                slides: [
                    {
                        image: '48.jpg',
                        positions: {
                            left: '0px',
                            top: '-215px'
                        },
                        zoom: '150%'
            //            sounds: [
            //   {title: '', mp3: '48.mp3'}
            // ]
                    }
                ]
            },
            {
                id: 49,
                type: 'page',
                template: 'page49.html'
            },
            {
                id: 50,
                type: 'page',
                template: 'page50.html',
                slides: [
                    {
                        image: '50.jpg',
                        positions: {
                            left: '0px',
                            top: '-209px'
                        },
                        zoom: '168%',
                        sounds: [
                            {title: '', mp3: '36.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 51,
                type: 'page',
                template: 'page51.html',
                slides: [
                    {
                        image: '51.jpg',
                        positions: {
                            left: '0px',
                            top: '0px'
                        }

                    }
                ]
            },
            {
                id: 52,
                type: 'page',
                template: 'page52.html',
                slides: [
                    {
                        image: '52_1.jpg',
                        sounds: [
                            {title: '', mp3: '38.1.mp3'}
                        ]
                    },
                    {
                        image: '52_2.jpg',
                        sounds: [
                            {title: '', mp3: '38.2.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 53,
                type: 'page',
                template: 'page53.html',
                slides: [
                    {
                        image: '53.jpg',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        sounds: [
                            {title: '', mp3: '39.mp3'}
                        ]
                    }
                ]
            },
            {
                id: '54-1',
                type: 'rubric_12',
                images: [
                    {
                        thumb: '1_thumb.jpg',
                        image: '2.jpg',
                        sounds: [
                            {title: '', mp3: '3_1.mp3'}
                        ]
                    },
                    {
                        thumb: '2_thumb.jpg',
                        image: '1.jpg',
                        sounds: [
                            {title: '', mp3: '3_1.mp3'}
                        ]
                    },
                    {
                        thumb: '3_thumb.jpg',
                        image: '3.jpg',
                        sounds: [
                            {title: '', mp3: '3_1.mp3'}
                        ]
                    },
                    {
                        thumb: '4_thumb.jpg',
                        image: '4.jpg',
                        sounds: [
                            {title: '', mp3: '3_1.mp3'}
                        ]
                    },
                    {
                        thumb: '5_thumb.jpg',
                        image: '5.jpg',
                        sounds: [
                            {title: '', mp3: '3_1.mp3'}
                        ]
                    },
                    {
                        thumb: '6_thumb.jpg',
                        image: '6.jpg',
                        sounds: [
                            {title: '', mp3: '3_1.mp3'}
                        ]
                    },
                    {
                        thumb: '7_thumb.jpg',
                        image: '7.jpg',
                        sounds: [
                            {title: '', mp3: '3_1.mp3'}
                        ]
                    },
                    {
                        thumb: '8_thumb.jpg',
                        image: '8.jpg',
                        sounds: [
                            {title: '', mp3: '3_1.mp3'}
                        ]
                    },
                    {
                        thumb: '9_thumb.jpg',
                        image: '9.jpg',
                        sounds: [
                            {title: '', mp3: '3_1.mp3'}
                        ]
                    },
                    {
                        thumb: '10_thumb.jpg',
                        image: '10.jpg',
                        sounds: [
                            {title: '', mp3: '3_1.mp3'}
                        ]
                    },
                    {
                        thumb: '11_thumb.jpg',
                        image: '11.jpg',
                        sounds: [
                            {title: '', mp3: '3_1.mp3'}
                        ]
                    },
                    {
                        thumb: '12_thumb.jpg',
                        image: '12.jpg',
                        sounds: [
                            {title: '', mp3: '3_1.mp3'}
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        name: 'Glava2',
        pages: [
            // {
            //     id: 55,
            //     type: 'video',
            //     video: 'intro.mp4'
            // },
            {
                id: 56,
                type: 'page',
                template: 'page56.html',
                map: 'true',
                slides: [
                    {
                        image: '56.jpg',
                        positions: {
                            left: '0px',
                            top: '-131px'
                        },
                        zoom: '165%',
                        sounds: [
                            {title: '', mp3: '2.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 57,
                type: 'page',
                template: 'page57.html',
                slides: [
                    {
                        image: '57.jpg',
                        description: 'Переводчик на Руси',
                        positions: {
                            left: '-26px',
                            top: '0px'
                        }
                    }
                ]
            },
            {
                id: 58,
                type: 'page',
                template: 'page58.html',
              //  map: 'true',
                slides: [
                    {
                        image: '58.jpg',
                        positions: {
                            left: '-325px',
                            top: '-72px'
                        },
                        zoom: '113%',
                        sounds: [
                            {title: '', mp3: '4.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 59,
                type: 'page',
                template: 'page59.html',
                slides: [
                    {
                        image: '59_1.jpg',
                        description: 'Воевода Афанасий Ордын-Нащокин',
                        positions: {
                            left: '-417px',
                            top: '-23px'
                        },
                        zoom: '107%'
                    },
                    {
                        image: '59_2.jpg',
                        discription: 'Воеводы Иван Борисович Репнин и Пётр Иванович Потёмкин',
                        positions: {
                            left: '-530px',
                            top: '-0px'
                        },
                        zoom: '122%'
                    }
                ]
            },
            {
                id: 61,
                type: 'page',
                template: 'page61.html',
                slides: [
                    {
                        image: '61.jpg',
                        description: 'Беззаконник, любящий взятки',
                        positions: {
                            left: '-57px',
                            top: '-12px'
                        },
                        zoom: '102%'
                    }
                ]
            },
            {
                id: 62,
                type: 'page',
                template: 'page62.html'
            },
            {
                id: 63,
                type: 'page',
                template: 'page63.html',
                slides: [
                    {
                        image: '63.jpg',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        sounds: [
                            {title: '', mp3: '63.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 64,
                type: 'page',
                template: 'page64.html',
                slides: [
                    {
                        image: '64.jpg',
                        positions: {
                            left: '-492px',
                            top: '0px'
                        }
            //             ,
            // sounds: [
            //   {title: '', mp3: '63.mp3'}
            // ]
                    }
                ]
            },
            {
                id: 65,
                type: 'page',
                template: 'page65.html'
            },
            {
                id: 66,
                type: 'page',
                template: 'page66.html',
                slides: [
                    {
                        image: '66.jpg'
                    },
                    {
                        image: '66_1.jpg'
                    }
                ]
            },
            {
                id: 67,
                type: 'page',
                template: 'page67.html'
            },
            {
                id: 68,
                type: 'page',
                template: 'page68.html',
                map: 'true',
                slides: [
                    {
                        image: '68_1.jpg',
                        positions: {
                            left: '-12px',
                            top: '-304px'
                        },
                        zoom: '185.7%',
                        sounds: [
                            {title: '', mp3: '14.1.mp3'}
                        ]
                    },
                    {
                        image: '68_2.jpg',
                        positions: {
                            left: '0px',
                            top: '-292px'
                        },
                        zoom: '184.43%',
                        sounds: [
                            {title: 'Решающая битва с самнитами при Бовиане, 305 год до н.э', mp3: '14.2.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 69,
                type: 'page',
                template: 'page69.html'
            },
            {
                id: 70,
                type: 'page',
                template: 'page70.html',
                slides: [
                    {
                        image: '70.jpg',
                        positions: {
                            left: '-56px',
                            top: '0px'
                        },
                        sounds: [
                            {title: '', mp3: '15.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 71,
                type: 'page',
                template: 'page71.html',
                slides: [
                    {
                        image: '71.jpg'

                    },
                    {
                        image: '71_2.jpg',
                        title: 'Георг Саал. Медвежья семья',
                        sounds: [
                            {title: '', mp3: '16.2.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 72,
                type: 'page',
                template: 'page72.html',
                slides: [
                    {
                        image: '72_1.jpg',
                        positions: {
                            left: '-270px',
                            top: '-40px'
                        },
                        zoom: '122%',
                        sounds: [
                            {title: 'Греческий фактор в судьбе России', mp3: '17.1.mp3'}
                        ]
                    },
                    {
                        image: '72_2.jpg',
                        positions: {
                            left: '-90px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: '', mp3: '17.2.mp3'}
                        ]
                    },
                    {
                        image: '72_3.jpg',
                        positions: {
                            left: '0px',
                            top: '-80px'
                        },
                        zoom: '122%',
                        sounds: [
                            {title: '', mp3: '17.3.mp3'}
                        ]
                    },
                    {
                        image: '72_4.jpg',
                        positions: {
                            left: '-270px',
                            top: '-40px'
                        },
                        zoom: '122%',
                        sounds: [
                            {title: '', mp3: '17.4.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 73,
                type: 'page',
                template: 'page73.html',
                map: 'true',
                slides: [
                    {
                        image: '73_1.jpg',
                        positions: {
                            left: '0px',
                            top: '-181px'
                        },
                        zoom: '197%'
                    },
                    {
                        image: '73_2.jpg',
                        positions: {
                            left: '0px',
                            top: '-155px'
                        },
                        zoom: '200%'
                    }
                ]
            },
            {
                id: 74,
                type: 'page',
                template: 'page74.html',
                slides: [
                    {
                        image: '74_1.jpg',
                        positions: {
                            left: '-369px',
                            top: '0px'
                        },
                        zoom: '101%'
                    },
                    {
                        image: '74_2.jpg',
                        positions: {
                            left: '-307px',
                            top: '0px'
                        },
                        zoom: '100%'
                    },
                    {
                        image: '74_3.jpg',
                        positions: {
                            left: '-169px',
                            top: '-40px'
                        },
                        zoom: '121%'
                    }
                ]
            },
            {
                id: 75,
                type: 'page',
                template: 'page75.html',
                slides: [
                    {
                        image: '75.jpg',
                        positions: {
                            left: '0px',
                            top: '-48px'
                        },
                        zoom: '178%'
                    }
                ]
            },
            {
                id: 76,
                type: 'page',
                template: 'page76.html',
                slides: [
                    {
                        image: '76.jpg',
                        positions: {
                            left: '0px',
                            top: '-21px'
                        },
                        zoom: '171%',
                        sounds: [
                            {title: '', mp3: '23.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 77,
                type: 'page',
                template: 'page77.html',
                slides: [
                    {
                        image: '77.jpg',
                        positions: {
                            left: '-43px',
                            top: '0px'
                        },
                        zoom: '101%',
                        sounds: [
                            {title: 'Эстетика городской застройки', mp3: '24.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 78,
                type: 'page',
                template: 'page78.html',
                slides: [
                    {
                        image: '78.jpg',
                        discription: 'Симон Ушаков. Древо государства Российского',
                        positions: {
                            left: '-197px',
                            top: '0px'
                        },
                        sounds: [
                            {title: 'Древо государства Российского', mp3: '25.mp3'}
                        ]
                    }
                ]
            },
            {
                id: '79-1',
                type: 'rubric_parts',
                sections: [
                    {
                        id: 'section-1',
                        active: 1,
                        images: [1, 2, 3, 4, 5, 6, 7, 8].map(function (number) {
                            return {
                                image: number + '.jpg',
                                positions: ['-160px', '0px']
                            }
                        })
                    },
                    {
                        id: 'section-2',
                        active: 7,
                        images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (number) {
                            return {
                                image: number + '.jpg'
                            }
                        })
                    },
                    {
                        id: 'section-3',
                        active: 5,
                        images: [1, 2, 3, 4, 5, 6, 7, 8].map(function (number) {
                            return {
                                image: number + '.jpg',
                                positions: ['0', '0px']
                            }
                        })
                    },
                    {
                        id: 'section-4',
                        active: 5,
                        images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (number) {
                            return {
                                image: number + '.jpg'
                            }
                        })
                    },
                    {
                        id: 'section-5',
                        active: 5,
                        images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (number) {
                            return {
                                image: number + '.jpg'
                            }
                        })
                    },
                    {
                        id: 'section-6',
                        active: 0,
                        images: [1].map(function (number) {
                            return {
                                image: number + '.jpg'
                            }
                        })
                    }
                ]
            }
        ]
    },
   {
        id: 5,
        name: 'Glava3',
        pages: [
        //     {
        //         id: 80,
        //         type: 'video',
        //         video: 'intro.mp4'
        //     },
            {
                id: 81,
                type: 'page',
                template: 'page81.html',
                slides: [
                    {
                        image: '81.jpg',
                        description: 'Государь Алексей Михайлович',
                        positions: {
                            left: '-90px',
                            top: '-40px'
                        },
                        sounds: [
                            {title: '', mp3: '2.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 82,
                type: 'page',
                template: 'page82.html',
                slides: [
                    {
                        image: '82.jpg',
                        description: 'Турецкий посол',
                        positions: {
                            left: '-526px',
                            top: '0px'
                        },
                        sounds: [
                            {title: '', mp3: '3.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 83,
                type: 'page',
                template: 'page83.html',
                slides: [
                    {
                        image: '83.jpg',
                        description: 'Турецкое посольство',
                        positions: {
                            left: '-191px',
                            top: '-45px'
                        }
                    }
                ]
            },
            {
                id: 84,
                type: 'page',
                template: 'page84.html',
                slides: [
                    {
                        image: '84.jpg',
                        positions: {
                            left: '-87px',
                            top: '-14px'
                        },
                        sounds: [
                            {title: '', mp3: '5.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 85,
                type: 'page',
                template: 'page85.html',
                slides: [
                    {
                        image: '85.jpg',
                        description: 'Процессия патриарха',
                        positions: {
                            left: '-342px',
                            top: '-167px'
                        }
                    }
                ]
            },
            {
                id: 86,
                type: 'page',
                template: 'page86.html',
                slides: [
                    {
                        image: '86.jpg',
                        description: 'Франкский народ в 17 веке, испанцы',
                        positions: {
                            left: '-498px',
                            top: '0px'
                        },
                        sounds: [
                            {title: '', mp3: '7.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 87,
                type: 'page',
                scroll: 'yes',
                template: 'page87.html'
            },
            {
                id: 88,
                type: 'page',
                template: 'page88.html'
        //          sounds: [
        //   {title: '', mp3: '88.mp3'}
        // ]
            },
            {
                id: 89,
                type: 'page',
                template: 'page89.html',
                slides: [
                    {
                        image: '89.jpg',
                        positions: {
                            left: '-64px',
                            top: '-65px'
                        },
                        sounds: [
                            {title: '', mp3: '10.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 90,
                type: 'page',
                template: 'page90.html',
                slides: [
                    {
                        image: '90.jpg',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        sounds: [
                            {title: '', mp3: '11.1.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 91,
                type: 'page',
                template: 'page91.html',
                slides: [
                    {
                        image: '91.jpg',
                        positions: {
                            left: '-229px',
                            top: '0px'
                        }
                    }
                ]
            },
            {
                id: 92,
                type: 'page',
                template: 'page92.html'
            },
            {
                id: 93,
                type: 'page',
                template: 'page93.html',
                slides: [
                    {
                        image: '93.jpg',
                        positions: {
                            left: '-143px',
                            top: '-255px'
                        },
                        sounds: [
                            {title: '', mp3: '13.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 94,
                type: 'page',
                template: 'page94.html',
              // map: 'true',
                slides: [
                    {
                        image: '94_1.jpg',
                        sounds: [
                            {title: '', mp3: '14.1.mp3'}
                        ]

                    },
                    {
                        image: '94_2.jpg',
                        sounds: [
                            {title: '', mp3: '14.2.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 95,
                type: 'page',
                template: 'page95.html'
            },
            {
                id: 96,
                type: 'page',
                template: 'page96.html',
                slides: [
                    {
                        image: '96.jpg',
                        positions: {
                            left: '-162px',
                            top: '-139px'
                        }
                    }
                ]
            },
            {
                id: 97,
                type: 'page',
                template: 'page97.html',
                sounds: [
                    {title: '', mp3: '16.mp3'}
                ]
            },
            {
                id: 98,
                type: 'page',
                template: 'page98.html',
                slides: [
                    {
                        image: '98.jpg',
                        description: 'Святой 17 века Симеон Верхотурский',
                        positions: {
                            left: '-475px',
                            top: '-50px'
                        },
                        sounds: [
                            {title: '', mp3: '17.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 99,
                type: 'page',
                template: 'page99.html',
                slides: [
                    {
                        image: '99.jpg',
                        positions: {
                            left: '-161px',
                            top: '-127px'
                        },
                        sounds: [
                            {title: '1. Боярыня Морозова.', mp3: '18.1.mp3'},
                            {title: '2. Кого чтили на Руси.', mp3: '18.2.mp3'}
                        ]
                    }
                ]
            },
  //     {
  //       id: 100,
  //       type: 'page',
  //       template: 'page100.html',
	// scroll: 'yes',
  //       slides: [
  //           {image: '100_1.png'},
  //           {image: '100_2.png'},
  //           {image: '100_3.png'},
  //           {image: '100_4.png'},
  //           {image: '100_5.png'},
  //           {image: '100_6.png'}
  //        ]
  //     },
            {
                id: 100,
                type: 'page',
                template: 'page100.html',
                map: 'true',
                scroll: 'yes',
                sounds: [
                    {title: '', mp3: '100.mp3'}
                ]

            },
            {
                id: 101,
                type: 'page',
                template: 'page101.html',
                slides: [
                    {
                        image: '101.jpg',
                        positions: {
                            left: '-71px',
                            top: '0px'
                        }
            //             ,
            // sounds: [
            //   {title: '', mp3: '101.mp3'}
            // ]
                    }
                ]
            },
            {
                id: 102,
                type: 'page',
                template: 'page102.html',
                slides: [
                    {
                        image: '102.jpg',
                        positions: {
                            left: '-161px',
                            top: '-79px'
                        },
                        sounds: [
                            {title: '', mp3: '21.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 103,
                type: 'page',
                template: 'page103.html',
                slides: [
                    {
                        image: '103.jpg',
                        positions: {
                            left: '-153px',
                            top: '-54px'
                        },
                        sounds: [
                            {title: '', mp3: '22.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 104,
                type: 'page',
                template: 'page104.html',
                slides: [
                    {
                        image: '104.jpg',
                        positions: {
                            left: '-430px',
                            top: '-105px'
                        }
                    }
                ]
            },
            {
                id: 105,
                type: 'page',
                template: 'page105.html',
                slides: [
                    {
                        image: '105.jpg',
                        positions: {
                            left: '-65px',
                            top: '0px'
                        },
                        sounds: [
                            {title: '', mp3: '25.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 106,
                type: 'page',
                template: 'page106.html',
                slides: [
                    {
                        image: '106.jpg',
                        description: 'В алтаре храма',
                        positions: {
                            left: '-559px',
                            top: '0px'
                        }
                    }
                ]
            },
            {
                id: 107,
                type: 'page',
                template: 'page107.html',
                slides: [
                    {
                        image: '107.jpg',
                        positions: {
                            left: '0px',
                            top: '-160px'
                        },
                        sounds: [
                            {title: '', mp3: '27.1.mp3'}
                        ]
                    },
                    {
                        image: '107_1.jpg',
                        positions: {
                            left: '0px',
                            top: '-160px'
                        },
                        sounds: [
                            {title: '', mp3: '27.2.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 108,
                type: 'page',
                template: 'page108.html',
                slides: [
                    {
                        image: '108.jpg',
                        positions: {
                            left: '-49px',
                            top: '-42px'
                        },
                        sounds: [
                            {title: '', mp3: '28.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 109,
                type: 'page',
                template: 'page109.html',
                slides: [
                    {
                        image: '109_1.jpg',
                      //  description: '<span class="twoLine">Английский дипломат Хенри Уоттон, политик и член Палаты Общин Голландский дипломат Исаак Масса, свидетель Смутного времени на Руси</span>',
                        positions: {
                            left: '-59px',
                            top: '0px'
                        }
                    },
                    {
                        image: '109_2.jpg',
                      //  description: 'Консул французского короля',
                        positions: {
                            left: '-48px',
                            top: '0px'
                        },
                        sounds: [
                            {title: '', mp3: '30.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 110,
                type: 'page',
                template: 'page110.html',
                slides: [
                    {
                        image: '110.jpg',
                        positions: {
                            left: '-104px',
                            top: '-258px'
                        },
                        sounds: [
                            {title: '', mp3: '32.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 111,
                type: 'page',
                template: 'page111.html',
                slides: [
                    {
                        image: '111_1.jpg',
                        description: 'Шведские ружья в действии',
                        positions: {
                            left: '-392px',
                            top: '0px'
                        },
                        // sounds: [
                        //     {title: 'Оружие - наша традиция', mp3: '111_1.mp3'}
                        // ]
                    },
                    {
                        image: '111_2.jpg',
                    //    description: 'Шведские ружья в действии',
                        positions: {
                            left: '-280px',
                            top: '0px'
                        },
                        // sounds: [
                        //     {title: 'Лучший способ борьбы с преступностью', mp3: '111_2.mp3'}
                        // ]
                    }
                ]
            },
            {
                id: 112,
                type: 'page',
                template: 'page112.html',
                slides: [
                    {
                        image: '112.jpg',
                        positions: {
                            left: '-282px',
                            top: '-40px'
                        },
                        zoom: '120%'
                    }
                ]
            },
            {
                id: 113,
                type: 'page',
                template: 'page113.html',
                slides: [
                    {
                        image: '113.jpg',
                        positions: {
                            left: '-577px',
                            top: '0px'
                        }
                    }
                ]
            },
            {
                id: 114,
                type: 'page',
                template: 'page114.html',
                map: 'true',
                slides: [
                    {
                        image: '114.jpg',
                        positions: {
                            left: '-86px',
                            top: '-222px'
                        },
                        sounds: [
                            {title: '', mp3: '38.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 115,
                type: 'page',
                template: 'page115.html',
                sounds: [
                    {title: '', mp3: '39.mp3'}
                ]
            },
            {
                id: 116,
                type: 'page',
                template: 'page116.html',
                slides: [
                    {
                        image: '116.jpg',
                        positions: {
                            left: '-86px',
                            top: '-95px'
                        },
                        sounds: [
                            {title: '', mp3: '40.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 117,
                type: 'page',
                template: 'page117.html'
            },
            {
                id: 118,
                type: 'page',
                template: 'page118.html',
                sounds: [
                    {title: 'Из поучений преподобного Саввы', mp3: '118.mp3'}
                ]
            },
            {
                id: 119,
                type: 'page',
                template: 'page119.html',
                slides: [
                    {
                        image: '119.jpg',
                        description: 'Священник за богослужением',
                        positions: {
                            left: '-545px',
                            top: '0px'
                        },
                        sounds: [
                            {title: '', mp3: '44.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 120,
                type: 'page',
                template: 'page120.html',
                slides: [
                    {
                        image: '120.jpg',
                        positions: {
                            left: '-88px',
                            top: '-42px'
                        },
                        sounds: [
                            {title: '', mp3: '45.1.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 121,
                type: 'page',
                template: 'page121.html',
                slides: [
                    {
                        image: '121.jpg',
                        positions: {
                            left: '-598px',
                            top: '-142px'
                        }
                    }
                ]
            },
            {
                id: 122,
                type: 'page',
                template: 'page122.html',
                map: 'true',
                slides: [
                    {
                        image: '122.jpg',
                        positions: {
                            left: '-86px',
                            top: '-245px'
                        }
                    }
                ]
            },
            {
                id: 123,
                type: 'page',
                template: 'page123.html',
                scroll: 'yes',
                sounds: [
                    {title: '', mp3: '48.mp3'}
                ]
            },
            {
                id: 124,
                type: 'page',
                template: 'page124.html',
                slides: [
                    {
                        image: '124.jpg',
                        description: 'Христос умывает ноги ученикам',
                        positions: {
                            left: '-390px',
                            top: '-240px'
                        },
                        zoom: '241%'
                    }
                ]
            },
            {
                id: '2-1',
                type: 'rubric_raskol'
            }
        ]
    },*/
    {
        id: 6,
        name: 'Glava4',
        pages: [
          //   {
          //       id: 126,
          //       type: 'video',
          //       video: 'vstup.mp4'
          //   },
          /*  {
                id: 127,
                type: 'page',
                template: 'page127.html',
                slides: [
                    {
                        image: '127_1.jpg',
                        positions: {
                            left: '-215px',
                            top: '-92px'
                        },
                        zoom: '125%',
                        sounds: [
                            {title: '', mp3: '2.1.mp3'}
                        ]
                    },
                    {
                        image: '127_3.jpg',
                        positions: {
                            left: '-240px',
                            top: '-140px'
                        },
                        zoom: '132%'
                    },
                    {
                        image: '127_2.jpg',
                        positions: {
                            left: '-240px',
                            top: '-140px'
                        },
                        zoom: '132%'
                    }
                ]
            },
            {
                id: 128,
                type: 'page',
                template: 'page128.html',
                sounds: [
                    {title: '', mp3: '3.mp3'}
                ]
            },
            {
                id: 129,
                type: 'page',
                template: 'page129.html',
                slides: [
                    {
                        image: '129.jpg',
                        description: 'Персидский купец',
                        positions: {
                            left: '-476px',
                            top: '-0px'
                        }
                        // ,
                        // sounds: [
                        //     {title: '', mp3: '129.mp3'}
                        // ]
                    }
                ]
            },
            {
                id: 130,
                type: 'page',
                template: 'page130.html',
                slides: [
                    {
                        image: '130.jpg',
                        description: '<span>Настоятель пяти монастырей,<br/>один из наиболее образованных людей 17' +
                        ' века<br/> святитель Дмитрий Ростовский </span>',
                        positions: {
                            left: '-551px',
                            top: '0px'
                        }
                    }
                ]
            },
            {
                id: 131,
                type: 'page',
                template: 'page131.html',
                slides: [
                    {
                        image: '131.jpg',
                        positions: {
                            left: '0px',
                            top: '-151px'
                        },
                        zoom: '165%'
                    }, {
                        image: '131_1.jpg',
                        positions: {
                            left: '0px',
                            top: '-151px'
                        },
                        zoom: '165%'
                    }
                ]
            },
            {
                id: 132,
                type: 'page',
                template: 'page132.html',
                slides: [
                    {
                        image: '132_1.jpg',
                        description: 'Знатные люди',
                        positions: {
                            left: '-283px',
                            top: '0px'
                        },
                        zoom: '101%'
            //               sounds: [
            //   {title: '', mp3: '132_1.mp3'}
            // ]
                    },
                    {
                        image: '132_2.jpg',
                        description: 'Боярин Лев Нарышкин. Глава посольского приказа,<br/> родной брат второй жены Алексея Михайловича',
                        positions: {
                            left: '-31px',
                            top: '-42px'
                        },
                        zoom: '110%'
            //               sounds: [
            //   {title: '', mp3: '132_2.mp3'}
            // ]
                    }
                ]
            },
            {
                id: 133,
                type: 'page',
                template: 'page133.html',
                slides: [
                    {
                        image: '133.jpg',
                        positions: {
                            left: '0px',
                            top: '-116px'
                        },
                        zoom: '195%',
                        sounds: [
                            {title: '', mp3: '10.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 134,
                type: 'page',
                template: 'page134.html',
                slides: [
                    {
                        image: '134.jpg',
                        positions: {
                            left: '-487px',
                            top: '0px'
                        },
                        sounds: [
                            {title: 'Кого считали благовоспитанным. Русский взгляд', mp3: '12.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 135,
                type: 'page',
                template: 'page135.html',
                scroll: 'yes',
                slides: [
                    {
                        image: '135_1.jpg',
                        sounds: [
                            {title: '', mp3: '13.1.mp3'}
                        ]
                    },
                    {
                        image: '135_2.jpg'
                    }
                ],
              //   sounds: [
              //       {title: '', mp3: '135.mp3'}
              //   ],
                map: 'true'
            },
            {
                id: 136,
                type: 'page',
                template: 'page136.html',
                slides: [
                    {
                        image: '136.jpg',
                        positions: {
                            left: '0px',
                            top: '-239px'
                        },
                        zoom: '162%',
                        sounds: [
                            {title: '', mp3: '14.1.mp3'}
                        ]
                    }, {
                        image: '136_1.jpg',
                        positions: {
                            left: '0px',
                            top: '-239px'
                        },
                        zoom: '162%'
                        // ,
                        // sounds: [
                        //     {title: '', mp3: '136_1.mp3'}
                        // ]
                    }
                ]
            },
            {
                id: 137,
                type: 'page',
                template: 'page137.html',
                sounds: [
                    {title: '', mp3: '15.mp3'}
                ]
            },
            {
                id: 138,
                type: 'page',
                template: 'page138.html',
                slides: [
                    {
                        image: '138.jpg',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        zoom: '100%'
                    }
                ]
            },
            {
                id: 139,
                type: 'page',
                template: 'page139.html',
                slides: [
                    {
                        image: '139.jpg',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        zoom: '100%'
                    }
                ]
            },
            {
                id: 140,
                type: 'page',
                template: 'page140.html',
                slides: [
                    {
                        image: '140.jpg',
                        description: 'Русский боярин',
                        positions: {
                            left: '-44px',
                            top: '0px'
                        },
                        sounds: [
                            {title: '', mp3: '17.1.mp3'}
                        ]
                    },
                    {
                        image: '140_2.jpg',
                        description: 'Боярин и воевода',
                        positions: {
                            left: '-44px',
                            top: '0px'
                        }
                    }
                ]
            },
            {
                id: 141,
                type: 'page',
                template: 'page141.html',
                slides: [
                    {
                        image: '141.jpg',
                        positions: {
                            left: '0px',
                            top: '-124px'
                        },
                        zoom: '140%'
                    }
                ]
            },
            {
                id: 142,
                type: 'page',
                template: 'page142.html',
                slides: [
                    {
                        image: '142.jpg',
                        positions: {
                            left: '-352px',
                            top: '0px'
                        },
                        zoom: '100%'
                    }
                ]
            },
            {
                id: 143,
                type: 'page',
                template: 'page143.html',
                slides: [
                    {
                        image: '143_1.jpg',
                        description: 'Русские женщины'
                    },
                    {
                        image: '143_3.jpg',
                        description: 'Русские женщины',
                        sounds: [
                            {title: '', mp3: '20.2.mp3'}
                        ]
                    },
                    {
                        image: '143_2.jpg',
                        description: 'Русские женщины'
                    },

                    {
                        image: '143_4.jpg',
                        description: 'Русские женщины'
                    },
                    {
                        image: '143_5.jpg',
                        description: 'Русские женщины'
                    }
                ]
            },
            {
                id: 144,
                type: 'page',
                template: 'page144.html',
                slides: [
                    {
                        image: '144.jpg',
                        positions: {
                            left: '-127px',
                            top: '0px'
                        },
                        zoom: '102%'
                    }
                ]
            },
            {
                id: 145,
                type: 'page',
                template: 'page145.html',
                slides: [
                    {
                        image: '145.jpg',
                        positions: {
                            left: '-203px',
                            top: '0px'
                        }
                    }
                ]
            },
            {
                id: 146,
                type: 'page',
                template: 'page146.html',
                sounds: [
                    {title: 'Коломенский дворец царя Алексея Михайловича', mp3: '23.mp3'}
                ]
            },
            {
                id: 147,
                type: 'page',
                template: 'page147.html',
                slides: [
                    {
                        image: '147.jpg',
                        positions: {
                            left: '-100px',
                            top: '0px'
                        },
                        zoom: '100%'
                    }
                ]
            },
            {
                id: 148,
                type: 'page',
                template: 'page148.html',
                slides: [
                    {
                        image: '148.jpg',
                        positions: {
                            left: '-575px',
                            top: '0px'
                        },
                        zoom: '100%'
                    }
                ]
            },
            {
                id: 149,
                type: 'page',
                template: 'page149.html',
                slides: [
                    {
                        image: '149_1.jpg',
                        positions: {
                            left: '0px',
                            top: '-164px'
                        },
                        zoom: '183.85%',
                        sounds: [
                            {title: '', mp3: '25.1.mp3'}
                        ]
                    },
                    {
                        image: '149_2.jpg',
                        positions: {
                            left: '-20px',
                            top: '-226px'
                        },
                        zoom: '183.85%',
                        sounds: [
                            {title: '', mp3: '25.2.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 150,
                type: 'page',
                template: 'page150.html',
                map: 'true',
                slides: [
                    {
                        image: '150_1.jpg',
                        positions: {
                            left: '0px',
                            top: '-117px'
                        },
                        zoom: '165.5%',
                        sounds: [
                            {title: '', mp3: '26.1.mp3'}
                        ]

                    },
                    {
                        image: '150_2.jpg',
                        positions: {
                            left: '0px',
                            top: '-136px'
                        },
                        zoom: '166%',
                        sounds: [
                            {title: '', mp3: '26.2.mp3'}
                        ]
                    },
                    {
                        image: '150_3.jpg',
                        positions: {
                            left: '0px',
                            top: '-197px'
                        },
                        zoom: '165%',
                        sounds: [
                            {title: '', mp3: '26.3.mp3'}
                        ],
                        map: 'true'
                    }
                ]
            },
            {
                id: 151,
                type: 'page',
                template: 'page151.html',
                scalable: 'yes',
                sounds: [
                    {title: '', mp3: '27.mp3'}
                ]
            },
            {
                id: 152,
                type: 'page',
                template: 'page152.html',
                slides: [
                    {
                        image: '152.jpg',
                        positions: {
                            left: '0px',
                            top: '-103px'
                        },
                        zoom: '149%',
                        sounds: [
                            {title: '', mp3: '28.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 153,
                type: 'page',
                template: 'page153.html',

                slides: [
                    {
                        image: '153.jpg',
                        description: 'Собака племени мученика Христофора',
                        positions: {
                            left: '-66px',
                            top: '0px'
                        },
                        zoom: '102%',
                        sounds: [
                            {title: '', mp3: '30.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 154,
                type: 'page',
                template: 'page154.html',
                slides: [
                    {
                        image: '154.jpg',
                        positions: {
                            left: '-314px',
                            top: '0px'
                        },
                        sounds: [
                            {title: '', mp3: '31.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 155,
                type: 'page',
                template: 'page155.html',
                sounds: [
                    {title: '', mp3: '32.mp3'}
                ]
            },
            {
                id: 156,
                type: 'page',
                template: 'page156.html'
            },
            {
                id: 157,
                type: 'page',
                template: 'page157.html'
            },
            {
                id: 158,
                type: 'page',
                template: 'page158.html',
                slides: [
                    {
                        image: '158.jpg',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        zoom: '102%'
                    }
                ]
            },
            {
                id: 159,
                type: 'page',
                template: 'page159.html',
                slides: [
                    {
                        image: '159.jpg',
                        positions: {
                            left: '-338px',
                            top: '0px'
                        },
                        zoom: '103%',
                        sounds: [
                            {title: '', mp3: '35.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 160,
                type: 'page',
                template: 'page160.html',
                slides: [
                    {
                        image: '160.jpg',
                        positions: {
                            left: '-195px',
                            top: '0px'
                        },
                        zoom: '103%',
                        sounds: [
                            {title: '', mp3: '36.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 161,
                type: 'page',
                template: 'page161.html',
                slides: [
                    {
                        image: '161.jpg',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        zoom: '102%'
                    }
                ]
            },
            {
                id: 162,
                type: 'page',
                template: 'page162.html',
                slides: [
                    {
                        image: '162_1.jpg',
                      //  description: 'Деревня',
                        positions: {
                            left: '-392px',
                            top: '0px'
                        }
                    },
                    {
                        image: '162_2.jpg',
                    //    description: 'В сторону непогоды',
                        positions: {
                            left: '-392px',
                            top: '0px'
                        }
                    }
                ]
            },
            {
                id: 163,
                type: 'page',
                template: 'page163.html'
            },
            {
                id: 164,
                type: 'page',
                template: 'page164.html'
            },
            {
                id: 165,
                type: 'page',
                template: 'page165.html',
                slides: [
                    {
                        image: '165.jpg',
                        positions: {
                            left: '-24px',
                            top: '0px'
                        },
                        zoom: '102%'
                    }
                ]
            },
          //   {
          //       id: 166,
          //       type: 'video',
          //       video: '47.mp4'
          //
          //   },*/
            {
                id: '166',
                type: 'page',
                template: 'page167.html'
            },

            {
                id: '168-1',
                type: 'rubric_gorod',
                sssr:
                    {
                        images: [
                            {
                                thumb: '1.jpg',
                                image: [1, 26]
                            },
                            {
                                thumb: '2.jpg',
                                image: [2, 1]
                            },
                            {
                                thumb: '3.jpg',
                                image: [3, 8]
                            },
                            {
                                thumb: '4.jpg',
                                image: [4, 7]
                            },
                            {
                                thumb: '5.jpg',
                                image: [5, 1]
                            },
                            {
                                thumb: '6.jpg',
                                image: [6, 1]
                            },
                            {
                                thumb: '7.jpg',
                                image: [7, 1]
                            },
                            {
                                thumb: '8.jpg',
                                image: [8, 3]
                            },
                            {
                                thumb: '9.jpg',
                                image: [9, 1]
                            },
                            {
                                thumb: '10.jpg',
                                image: [10, 1]
                            },
                            {
                                thumb: '11.jpg',
                                image: [11, 1]
                            },
                            {
                                thumb: '12.jpg',
                                image: [12, 1]
                            },
                            {
                                thumb: '13.jpg',
                                image: [13, 1]
                            },
                            {
                                thumb: '14.jpg',
                                image: [14, 1]
                            },
                            {
                                thumb: '15.jpg',
                                image: [15, 1]
                            },
                            {
                                thumb: '16.jpg',
                                image: [16, 4]
                            },
                            {
                                thumb: '17.jpg',
                                image: [17, 2]
                            },
                            {
                                thumb: '18.jpg',
                                image: [18, 1]
                            },
                            {
                                thumb: '19.jpg',
                                image: [19, 2]
                            },
                            {
                                thumb: '20.jpg',
                                image: [20, 2]
                            },
                            {
                                thumb: '21.jpg',
                                image: [21, 2]
                            },
                            {
                                thumb: '22.jpg',
                                image: [22, 1]
                            },
                            {
                                thumb: '23.jpg',
                                image: [23, 1]
                            },
                            {
                                thumb: '24.jpg',
                                image: [24, 1]
                            },
                            {
                                thumb: '25.jpg',
                                image: [25, 2]
                            },
                            {
                                thumb: '26.jpg',
                                image: [26, 1]
                            },
                            {
                                thumb: '27.jpg',
                                image: [27, 2]
                            },
                            {
                                thumb: '28.jpg',
                                image: [28, 1]
                            },
                            {
                                thumb: '29.jpg',
                                image: [29, 1]
                            },
                            {
                                thumb: '30.jpg',
                                image: [30, 1]
                            },
                            {
                                thumb: '31.jpg',
                                image: [31, 1]
                            },
                            {
                                thumb: '32.jpg',
                                image: [32, 1]
                            },
                            {
                                thumb: '33.jpg',
                                image: [33, 2]
                            },
                            {
                                thumb: '34.jpg',
                                image: [34, 1]
                            },
                            {
                                thumb: '35.jpg',
                                image: [35, 1]
                            },
                            {
                                thumb: '36.jpg',
                                image: [36, 1]
                            },
                            {
                                thumb: '37.jpg',
                                image: [37, 1]
                            },
                            {
                                thumb: '38.jpg',
                                image: [38, 1]
                            },
                            {
                                thumb: '39.jpg',
                                image: [39, 1]
                            },
                            {
                                thumb: '40.jpg',
                                image: [40, 2]
                            },
                            {
                                thumb: '41.jpg',
                                image: [41, 3]
                            },
                            {
                                thumb: '42.jpg',
                                image: [42, 1]
                            },
                            {
                                thumb: '43.jpg',
                                image: [43, 1]
                            },
                            {
                                thumb: '44.jpg',
                                image: [44, 1]
                            },
                            {
                                thumb: '45.jpg',
                                image: [45, 6]
                            }
                        ]
                    },
                russia:
                    {
                        images: [
                            {
                                thumb: '46.jpg',
                                image: [46, 1],
                                sounds: {
                                    2: {title: '', mp3: '3_1.mp3'},
                                    3: {title: '', mp3: '3_1.mp3'},
                                    5: {title: '', mp3: '3_1.mp3'}
                                }
                            },
                            {
                                thumb: '47.jpg',
                                image: [47, 1],
                                sounds: {
                                    1: {title: '', mp3: '3_2.mp3'}
                                }
                            },
                            {
                                thumb: '48.jpg',
                                image: [48, 1],
                                sounds: {
                                    4: {title: '', mp3: '3_1.mp3'}
                                }
                            },
                            {
                                thumb: '49.jpg',
                                image: [49, 1]

                            },
                            {
                                thumb: '50.jpg',
                                image: [50, 1]
                            },
                            {
                                thumb: '51.jpg',
                                image: [51, 1]
                            },
                            {
                                thumb: '52.jpg',
                                image: [52, 1]
                            },
                            {
                                thumb: '53.jpg',
                                image: [53, 1]
                            },
                            {
                                thumb: '54.jpg',
                                image: [54, 1]
                            },
                            {
                                thumb: '55.jpg',
                                image: [55, 1]
                            },
                            {
                                thumb: '56.jpg',
                                image: [56, 1]
                            },
                            {
                                thumb: '57.jpg',
                                image: [57, 1]
                            },
                            {
                                thumb: '58.jpg',
                                image: [58, 1]
                            }
                        ]
                    }
            },//end rubr
            {
                id: 169,
                type: 'page',
                template: 'page169.html',
                slides: [
                    {
                        image: '169.jpg',
                        positions: {
                            left: '-577px',
                            top: '0px'
                        },
                        sounds: [
                            {title: '', mp3: '44.mp3'}
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 7,
        name: 'Glava5',
        pages: [

        //     {
        //         id: 170,
        //         type: 'video',
        //         video: 'vstup.mp4'
        //     },
            {
                id: 171,
                type: 'page',
                template: 'page171.html',
                slides: [
                    {
                        image: '171.jpg',
                        positions: {
                            left: '-363px',
                            top: '0px'
                        },
                        zoom: '103%',
                        sounds: [
                            {title: '', mp3: '2.mp3'}
                        ]
                    }
                ]
            },
            {
                id: 172,
                type: 'page',
                template: 'page172.html',
                slides: [
                    {
                        image: '172.jpg',
                        description: 'Европейский баснописец',
                        positions: {
                            left: '-350px',
                            top: '-95px'
                        },
                        zoom: '135%'
                    }
                ]
            },
            {
                id: 173,
                type: 'page',
                template: 'page173.html'
            },
            {
                id: 174,
                type: 'page',
                template: 'page174.html'
            },
            {
                id: 175,
                type: 'page',
                template: 'page175.html'
            },
            {
                id: 176,
                type: 'page',
                template: 'page176.html'
            },
            {
                id: 177,
                type: 'page',
                template: 'page177.html'
            },
            {
                id: 178,
                type: 'page',
                template: 'page178.html'
            },
            {
                id: 179,
                type: 'page',
                template: 'page179.html'
            },
            {
                id: 180,
                type: 'page',
                template: 'page180.html'
            },
            {
                id: 181,
                type: 'page',
                template: 'page181.html',
                slides: [
                    {
                        image: '181_1.jpg',
                        description: 'В польском приказе. Голштинские посланники <br/> ' +
                        'из делегации Адама Олеария',
                        positions: {
                            left: '0px',
                            top: '0px'
                        },
                        zoom: '110%'
                    },
                    {
                        image: '181_2.jpg',
                        positions: {
                            left: '0px',
                            top: '-44px'
                        },
                        zoom: '120%'
                    }
                ]
            },
            {
                id: 182,
                type: 'page',
                template: 'page182.html'
            },
            {
                id: 183,
                type: 'page',
                template: 'page183.html'
            },
            {
                id: 184,
                type: 'page',
                template: 'page184.html'
            },
            {
                id: 185,
                type: 'page',
                template: 'page185.html'
            },
            {
                id: 186,
                type: 'page',
                template: 'page186.html'
            },
            {
                id: 187,
                type: 'page',
                template: 'page187.html'
            }
        //     ,
        //   {
        //         id: 188,
        //         type: 'video',
        //         video: 'Afonin_1min.mp4'
        //     }

        ]
    }
];

// Transform sections to flat collection
App.pages = [];

App.sections.forEach(function (section) {
    App.pages = App.pages.concat(section.pages);
});
