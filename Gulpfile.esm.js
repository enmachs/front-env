const defaultTask = (cb) => {
  // place code for your default task here
  console.log('hey!');
  cb();
}

export const runIt = (done) => {
  console.debug('Running it!');
  done();
}

export default defaultTask;
