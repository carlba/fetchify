import fetch from 'node-fetch';

class FetchJson {
  baseUrl: string | undefined;

  constructor(baseUrl?: string | undefined) {
    this.baseUrl = baseUrl;
  }

  async get<T extends Record<any, any>>(url: string): Promise<T> {
    const result = await fetch(new URL(url, this.baseUrl).toString(), { method: 'GET' });
    // console.log('test get ', result.headers);
    const json = (await result.json()) as any;
    return json;
  }

  async post<T extends Record<any, any>>(url: string, body: Record<string, any>): Promise<T> {
    const result = await fetch(new URL(url, this.baseUrl).toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', body: JSON.stringify(body) },
    });

    const json = (await result.json()) as T;
    return json;
  }

  async put(url: string) {
    const result = await fetch(new URL(url, this.baseUrl).toString(), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await result.json();
    return json;
  }

  async delete(url: string) {
    const result = await fetch(new URL(url, this.baseUrl).toString(), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function greet(name: string) {
  const coolFetch = new FetchJson();

  // const posts = await coolFetch.get<Record<string, unknown>>('/posts');

  const posts = await coolFetch.get<Record<string, unknown>>('http://httpstat.us/403?sleep=1000');

  // const insertedPosts = await coolFetch.post('/posts', { name: 'test' });
  console.log({ posts: posts });
}

greet('Carl');
