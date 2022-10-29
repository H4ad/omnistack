import { isUndefined } from '@nestjs/common/utils/shared.utils';
import { ConfigService } from '@nestjs/config';

// ref: https://github.com/nestjs/config/issues/245#issuecomment-1246791013
ConfigService.prototype.get = function (
  propertyPath: any,
  defaultValueOrOptions?: any,
  options?: any,
): any {
  const validatedEnvValue = this.getFromValidatedEnv(propertyPath);

  if (!isUndefined(validatedEnvValue))
    return validatedEnvValue;

  const defaultValue =
    this.isGetOptionsObject(defaultValueOrOptions) && !options
      ? undefined
      : defaultValueOrOptions;

  /**
   * Comment out this section so it does not read from process.env
   */
    // const processEnvValue = this.getFromProcessEnv(propertyPath, defaultValue)
    // if (!isUndefined(processEnvValue)) {
    //   return processEnvValue
    // }

  const internalValue = this.getFromInternalConfig(propertyPath);

  if (!isUndefined(internalValue))
    return internalValue;

  return defaultValue;
};
