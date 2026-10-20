import Certificate from '../models/Certificate.js';

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
export const getCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1, issueDate: -1 });

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a certificate
// @route   POST /api/certificates
// @access  Private (Admin)
export const createCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Certificate added successfully',
      data: certificate,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a certificate
// @route   PUT /api/certificates/:id
// @access  Private (Admin)
export const updateCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Certificate updated successfully',
      data: certificate,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Private (Admin)
export const deleteCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Certificate deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
