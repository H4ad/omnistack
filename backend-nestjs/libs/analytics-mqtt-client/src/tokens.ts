import { Inject } from '@nestjs/common';

export const MqttClientToken = Symbol('MqttClientToken');
export const InjectMqttClient = () => Inject(MqttClientToken);

export const AnalyticsServiceNameToken = Symbol('AnalyticsServiceNameToken');
export const InjectAnalyticsServiceName = () => Inject(AnalyticsServiceNameToken);
