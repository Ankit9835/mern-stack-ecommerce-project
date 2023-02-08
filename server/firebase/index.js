const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: "ecommerce-90b3d",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCTkNb2D+yRJ2Lh\nNsCIn+teyRUglC4ZJASrpLjjNnk3gaFnIQfPY1fnwcd53AG7aP5E62sBjNdELdB/\nbkpKT8sV8ZEbMDdaXwDDzLLYpUveThMc3fB5rkN+hLLZUm6k6K+Ub+wD+2CMUhgS\nTH5EHYyOxLlufLLk+A9SKWAAhlpKZlXGrFkyVEe8qaAZ82ETxsiwdYsYb1dO3Jwo\noNjvN4mGaahwoPJs0pmS7AxsXtiIUbtebzyfx0Pf4EP1DY2QLr2DD6BVAvPLM05p\nNp8qogedxDFF2ixalrQqQFhAYqPIq2IOXkVOOPPDx4FKoplz2da9DE5TFUQ+f65S\n1DFEsc05AgMBAAECggEAQuoM7+tspK2tgt6nE80gmAyqzekjtjbE/2hkhnOvJ+Ja\nZD9wITS1KdyPLcz75BXKJ0pxbXSGMN5tizth6KyiNMMjv6Zvk0U9PYxXFTJvYtEY\njaB+aU8CQB7AUxe0IId7Bt5xsaSNtVOMos+Y+h5EHIFMbLOTE40AtYsZg2NpEg8B\nFa9aBy0F+sxc68kg6w1rVk2xGmb9pdQgBE2epePoThe6njcLXK7vegyNwEpJ7hH0\nPrAJCeZQskf3J6qXajhlIywzryNhiOQpzY4Z2b5jLLxzX0TMqznL9NdnFLf3kc9H\nbCG4IZLxpVQDm7/QA036C++PF/SwSpD7mYnYdr9r+QKBgQDM7BHwiACDDTPnkm1O\nXZtgquNIxzlDpI3GarSaToy17iuMHHlMvym3ufh9YWbwiRre1+sDPg5r0Uu9GQ+j\nVv3G+L1wPmnLCaJS73MJBco0bvrZ2t+mhqesF19WLPgDUEenkIVWcdDuqmZ05I/U\nmjuX4psVuBqlxGtU1FrRTKRXXwKBgQC4WOcCfr86/u64RQm+zoK8HfVLU7VlVs2E\nrXSVbfnV1ZxT7QtlWVuGPAQDiRTdmuA3TCkn8mnc5J9v9zcayKw9RHtfw/pXDAxZ\nt/XLueuUB7uBhuwETYvntoEu51Yw84y0ajs8vYpl0XhDuMr6tt48+eNM1gGPX7EG\ncpdV3i0aZwKBgFc0KpoyNg2O48SrAkrz+LgVYK1K4mqPryl9pSd5P9X36Z4xS8lG\nHEmsITux5G192upz9fWmRdrJ8TIiZQ48abhvh6YpWTnm+qXSciCnzxmrFKL6ymwC\nJ35LX+27Kzu1wRhknulfe+rkpr8duLtfevaynw6KDwT15jruN0uUEud/AoGAbiB2\nCLCNLwJCvARKORmHUjgXZKOiNuLvLbatceNcH9lXZW+zoh0KpxtNToti0qwGDCLM\nZ1fS1Coj8TBfU/nTo1o41dHuyHejHSnfhZAQ4sLnyg4/CqcE0Czf6ZQ7kky8nr7j\nmnqkpgTH8rT/VV1PUF/74Nfr4KnKyE5Gh/6NNTsCgYByvcqyGSChmPXzioajVUQU\nH/CsuHSmwia4av1IWgQGfjHal1JHs4e99da4EVtfgDA74YpZ6r26EqlVJhhzzAoI\naXj50ceXkF57J3pwPMpljn7ZF5nhX00S8T/zQnabo9lw8SVmAz/0uco1Xg+1zv4T\nXGYApzEceScu9WsG0ib7MA==\n-----END PRIVATE KEY-----\n",
      client_email: "firebase-adminsdk-s81r6@ecommerce-90b3d.iam.gserviceaccount.com",
    }),
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
