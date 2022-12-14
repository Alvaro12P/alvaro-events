import { $log } from '@tsed/logger'
$log.level = process.env.LOG_LEVEL || 'DEBUG'
$log.name = 'Events'

export const logger = $log
