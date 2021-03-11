import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IMetric {
  urn: string;
  name: string;
  abbreviation: string;
  description?: string;
  labels: Map<string, string>;
  fields: {
    measures: string[];
    dimensions: string[];
    filters: unknown[];
  };
}

export type IMetricDocument = IMetric & Document;

export type IMetricModel = Model<IMetricDocument>;

const MetricSchema = new Schema<IMetricDocument, IMetricModel>(
  {
    urn: {
      type: String,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      trim: true,
      required: 'name is required'
    },
    abbreviation: {
      type: String,
      trim: true,
      unique: true,
      required: 'abbreviation is required'
    },
    description: {
      type: String,
      trim: true
    },
    labels: {
      type: Map,
      of: String
    },
    fields: {
      measures: [String],
      dimensions: [String],
      filters: [Object]
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    versionKey: false
  }
);

export default mongoose.model<IMetricDocument, IMetricModel>(
  'Metric',
  MetricSchema
);
