import { Inject } from '@nestjs/common';

export const AnalyticsMqttClientToken = Symbol('AnalyticsMqttClientToken');
export const InjectAnalyticsMqttClient = () => Inject(AnalyticsMqttClientToken);

export const AnalyticsClientToken = Symbol('AnalyticsClientToken');
export const InjectAnalyticsClient = () => Inject(AnalyticsClientToken);

export const AnalyticsServiceNameToken = Symbol('AnalyticsServiceNameToken');
export const InjectAnalyticsServiceName = () => Inject(AnalyticsServiceNameToken);
