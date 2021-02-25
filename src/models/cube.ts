import mongoose, { Schema, Model } from 'mongoose';

import { ICubeDocument } from 'src/types';

export interface ICubeModel extends Model<ICubeDocument> {
  list(): Promise<Array<ICubeDocument>>;
  findByUrn(urn: string): Promise<ICubeDocument | null>;
  updateByUrn(urn: string, data: ICubeDocument): Promise<ICubeDocument | null>;
}
const CubeSchema = new Schema<ICubeDocument, ICubeModel>(
  {
    urn: {
      type: String,
      unique: true,
      trim: true
    },
    connectionUrn: {
      type: String,
      trim: true,
      required: 'connectionUrn is required'
    },
    tableName: {
      type: String,
      trim: true,
      required: 'tableName is required'
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

CubeSchema.statics.list = function list() {
  return this.find({}, { _id: 0 }).lean().exec();
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

export default mongoose.model<ICubeDocument, ICubeModel>('Cube', CubeSchema);
