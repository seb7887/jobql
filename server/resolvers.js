const jwt = require('jsonwebtoken');
const { forwardTo } = require('prisma-binding');

const Query = {
  jobs: forwardTo('db'),
  users: forwardTo('db'),
  me(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  company(parent, { id }, ctx, info) {
    return ctx.db.query.company(
      {
        where: { id }
      },
      info
    );
  },
  job(parent, { id }, ctx, info) {
    return ctx.db.query.job(
      {
        where: { id }
      },
      info
    );
  }
}

const Mutation = {
  async signin(parent, { input }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email: input.email } });
    if (!user) {
      throw new Error(`No such user found for ${email}`);
    }
    // check if the password is correct
    if (user.password === input.password) {
      const token = jwt.sign({ sub: user.id }, process.env.APP_SECRET);
      return { user, token };
    } else {
      throw new Error('Invalid Password');
    }
  },
  async createJob(parent, { input }, ctx, info) {
    // check user auth
    if (!ctx.request.me) {
      throw new Error('Unauthorized');
    }
    const job = await ctx.db.mutation.createJob(
      {
        data: {
          company: {
            connect: {
              id: ctx.request.me.company.id
            }
          },
          ...input
        }
      },
      info
    );
    return job;
  }
}

module.exports = { Query, Mutation };