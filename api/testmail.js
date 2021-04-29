const mailer = require('./mailer')

async function test() {
  mailer('pkhajeh@gmail.com', 'Confirm your Email', 'Plese cliik the link beloow to\n yes pls ')
}
test()