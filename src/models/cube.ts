import mongoose, { Schema, Model } from 'mongoose';

import {
  IUpdateCubePayload,
  ICubeDocument,
  ICubeListQuery,
  ICubesStats
} from 'src/types';

export interface ICubeModel extends Model<ICubeDocument> {
  list(query: ICubeListQuery): Promise<Array<ICubeDocument>>;
  findByUrn(urn: string): Promise<ICubeDocument | null>;
  updateByUrn(
    urn: string,
    data: IUpdateCubePayload
  ): Promise<ICubeDocument | null>;
  getStats(): Promise<ICubesStats[]>;
}
const CubeSchema = new Schema<ICubeDocument, ICubeModel>(
  {
    urn: {
      type: String,
      unique: true,
      trim: true
    },
    connection: {
      type: String,
      trim: true,
      required: 'connection is required'
    },
    tableId: {
      type: String,
      trim: true,
      required: 'tableId is required'
    },
    content: {
      type: String,
      trim: true,
      required: 'content is required'
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

CubeSchema.index({ connection: 1, tableId: 1 }, { unique: true });

CubeSchema.statics.list = function list(query: ICubeListQuery = {}) {
  return this.find(query, { _id: 0 }).lean().exec();
};

CubeSchema.statics.findByUrn = function findByUrn(urn) {
  return this.findOne({ urn }, { _id: 0 }).lean().exec();
};

CubeSchema.statics.updateByUrn = function updateByUrn(urn, data) {
  return this.findOneAndUpdate(
    { urn },
    { $set: data },
    { projection: { _id: 0 }, new: true }
  )
    .lean()
    .exec();
};

CubeSchema.statics.getStats = function getStats() {
  return this.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        lastUpdatedAt: { $max: '$updatedAt' }
      }
    },
    { $project: { _id: 0 } }
  ]);
};

export default mongoose.model<ICubeDocument, ICubeModel>('Cube', CubeSchema);
