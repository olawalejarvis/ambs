import db from '../models';

const Type = {
  /**
   * Create a new type
   * Route: POST /api/v1/type
   * @param {Object} req
   * @param {Object} res
   * @return {void | Object} response object or void
   */
  create(req, res) {
    db.Type.create(req.body)
      .then(type => res.status(201).send(type));
  },
  /**
   * Retrive a type
   * Route: GET /api/v1/types/:title
   * @param {Object} req
   * @param {Object} res
   * @return {void | Object} response object or void
   */
  get(req, res) {
    db.Type.findOne({ where: { title: req.params.title } })
      .then((type) => {
        if (!type) {
          return res.status(404).send({ message: 'Type not found' });
        }
        return res.status(200).send(type);
      });
  },
  /**
   * Retrieve all types - Search or Get all types
   * Route: GET /api/v1/types
   * @param {Object} req
   * @param {Object} res
   * @return {void | Object} response object or void
   */
  all(req, res) {
    db.Type.findAndCountAll()
      .then(types => res.status(200).send(types));
  },
  /**
   * Edit a new type
   * Route: PATCH /api/v1/types/:title
   * @param {Object} req
   * @param {Object} res
   * @return {void | Object} response object or void
   */
  edit(req, res) {
    db.Type.findOne({ where: { title: req.params.title } })
      .then((type) => {
        if (!type) {
          return res.status(404).send({ message: 'Type not found' });
        }
        type.update(req.body)
          .then(updatedType => res.status(200).send(updatedType));
      });
  },
  /**
   * Delete a new type
   * Route: DELETE /api/v1/types/:title
   * @param {Object} req
   * @param {Object} res
   * @return {void | Object} response object or void
   */
  delete(req, res) {
    db.Type.findOne({ where: { title: req.params.title } })
      .then((type) => {
        if (!type) {
          return res.status(404).send({ message: 'Role not found' });
        }
        type.destroy()
          .then(() => res.status(200).send({ message: 'Deleted' }));
      });
  },
  /**
   * Retrive all artist's with a particular type
   * Route: GET /api/v1/types/:title/artists
   * @param {Object} req
   * @param {Object} res
   * @return {void | Object} response object or void
   */
  fetchArtistType(req, res) {
    db.Type.findAndCountAll({
      where: { title: req.params.title },
      include: [db.Artist]
    })
    .then(typeArtists => res.status(200).send(typeArtists));
  }
};

export default Type;