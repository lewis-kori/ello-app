## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

The graphql endpoint can be accessed by the route `{base_url}/api/graphql

An example query is:

```sh
{ 
    book(title: "A Color of His Own"){
        title,
        author,
        pages {
            pageIndex,
            content {
                index,
                token,
                content,
                isTappable
            }
        }
    }
}
```

The book title can be case insensitive.

### Cloud configuration

Enter the terraform directory where all terraform configuration files can be found.
Note, to proceed with next steps, you require the following env variables

```sh
AWS_SECRET_ACCESS_KEY=
AWS_ACCESS_KEY_ID=
```

These can be retrieved from AWS.

Run the steps:

  1. terraform init
  2. terraform plan (validates the configuration files are syntatically ok)
  3. terraform apply -auto-approve

The steps are automated via github work actions in the `build-and-deploy.yaml` file.

a live version of this app can be found here: <https://elloapp-test-elloapp-1256399429.us-east-1.elb.amazonaws.com>

The pending item is to provision an SSL certificate for the app.

The app is deployed to AWS fargate and runs on node.js and next.js server.
