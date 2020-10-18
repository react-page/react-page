import Head from 'next/head';
import React from 'react';
import Editor from '@react-page/editor';
import { plugins } from '../stuff/plugins';
export default function Home() {
  return <Editor plugins={plugins} />;
}
