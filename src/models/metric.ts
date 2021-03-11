import mongoose, { Schema, Model } from 'mongoose';
import { IMetricDocument } from 'src/types';

export interface IMetricModel extends Model<IMetricDocument> {
  findByUrn(urn: string): Promise<IMetricDocument | null>;
}

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

MetricSchema.statics.findByUrn = function findByUrn(urn) {
  return this.findOne({ urn }, { _id: 0 }).lean().exec();
};

export default mongoose.model<IMetricDocument, IMetricModel>(
  'Metric',
  MetricSchema
);
