import { createContentPlugin } from '@react-page/create-plugin-materialui';
import React from 'react';

type Address = {
  street: string;
  city: string;
  zipCode: string;
};
type Shop = {
  name: string;
  address: Address;
};

type State = {
  title: string;
  shops: Shop[];
};
export default createContentPlugin<State>({
  Renderer: ({ state }) => (
    <div>
      <h1>{state.title}</h1>
      <p>Shops:</p>
      <ul>
        {state.shops &&
          state.shops.map((shop, index) => (
            <li key={index}>
              <h2>{shop.name}</h2>
              <p>Adresss:</p>
              <p>
                {shop.address.street}
                <br />
                {shop.address.zipCode} {shop.address.city}
              </p>
            </li>
          ))}
      </ul>
    </div>
  ),
  name: 'custom-content-plugin-with-list',
  text: 'Custom content Plugin shop list',

  description: 'Some custom content plugin with a list field',
  version: '0.0.1',
  controlsLayout: {
    columnCount: 1,
  },
  schema: {
    properties: {
      title: {
        type: 'string',
      },
      shops: {
        type: 'array',
        items: {
          type: 'object',
          required: [],
          properties: {
            name: {
              type: 'string',
            },
            address: {
              type: 'object',
              required: [],
              properties: {
                street: {
                  type: 'string',
                },
                zipCode: {
                  type: 'string',
                },
                city: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    required: [],
  },
});
