export function createTimestamps(message: string) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function (...args: any) {
      const startTime = new Date(Date.now());
      console.log(
        `${message} started at: ${startTime.toLocaleString("en-GB")}`
      );
      const result = await method.apply(this, args);
      const endTime = new Date(Date.now());
      console.log(
        `${message} completed at: ${endTime.toLocaleString("en-GB")}`
      );
      console.log(
        `${message} took ${
          endTime.getTime() - startTime.getTime()
        }ms to complete.`
      );
      return result;
    };
  };
}
