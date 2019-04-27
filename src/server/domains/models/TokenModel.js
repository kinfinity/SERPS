/*
 * #k_infinityIII@Echwood
 *
 * userTokenModel: () : userTokenSchema
 *  necessary preparatory functions for the userTokenSchema
 *  exports userTokenModel
 *
 */
import mongoose from '../../Infrastructure/plugins/mongooseCon';
import TokenModel from '../schema/tokenSchema';

// Preparatory steps before save to model(pre-save)
TokenModel.pre('save', function(next) {

    const currentDate = new Date().getTime();

    this.updatedAt = currentDate;
    if (!this.created_at) {

      this.createdAt = currentDate;
      this.expireAt = currentDate + (60 * 60 * 1000);

    }
    next();

});

export default mongoose.model('TokenModel', TokenModel);