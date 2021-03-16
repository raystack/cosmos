import mongoose, { Schema, Model } from 'mongoose';
import { IMetricDocument, IUpdateMetricPayload } from 'src/types';

export interface IMetricModel extends Model<IMetricDocument> {
  findByUrn(urn: string): Promise<IMetricDocument | null>;
  list(query: {
    meta?: Record<string, string>;
  }): Promise<Array<IMetricDocument>>;
  updateByUrn(
    urn: string,
    data: IUpdateMetricPayload
  ): Promise<IMetricDocument | null>;
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
      required: 'abbreviation is required'
    },
    description: {
      type: String,
      trim: true
    },
    meta: {
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

MetricSchema.statics.list = function list(query = {}) {
  return this.find(query, { _id: 0 }).lean().exec();
};

MetricSchema.statics.findByUrn = function findByUrn(urn) {
  return this.findOne({ urn }, { _id: 0 }).lean().exec();
};

MetricSchema.statics.updateByUrn = function updateByUrn(urn, data) {
  return this.findOneAndUpdate(
    { urn },
    { $set: data },
    { projection: { _id: 0 }, new: true }
  )
    .lean()
    .exec();
};

export default mongoose.model<IMetricDocument, IMetricModel>(
  'Metric',
  MetricSchema
);
