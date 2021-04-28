import Cartesian3 from "../Core/Cartesian3.js";
import Cartesian4 from "../Core/Cartesian4.js";
import AlphaMode from "./AlphaMode.js";

/**
 * Components for building models.
 *
 * @namespace ModelComponents
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
var ModelComponents = {};

/**
 * Information about the quantized attribute.
 *
 * @alias ModelComponents.Quantization
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function Quantization() {
  /**
   * Whether the quantized attribute is oct-encoded.
   *
   * @type {Boolean}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.octEncoded = false;

  /**
   * The range used to convert buffer values to normalized values [0.0, 1.0]
   * This is typically computed as (1 << quantizationBits) - 1
   *
   * @type {Number}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.normalizationRange = undefined;

  /**
   * The bottom-left corner of the quantization volume. Not applicable for oct encoded attributes.
   *
   * @type {Number|Cartesian2|Cartesian3|Cartesian4|Matrix2|Matrix3|Matrix4}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.quantizedVolumeOffset = undefined;

  /**
   * The dimensions of the quantization volume. Not applicable for oct encoded attributes.
   *
   * @type {Number|Cartesian2|Cartesian3|Cartesian4|Matrix2|Matrix3|Matrix4}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.quantizedVolumeDimensions = undefined;

  /**
   * The component data type of the quantized attribute, e.g. ComponentDatatype.UNSIGNED_SHORT.
   *
   * @type {ComponentDatatype}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.componentDatatype = undefined;

  /**
   * The type of the quantized attribute, e.g. AttributeType.VEC2 for oct-encoded normals.
   *
   * @type {AttributeType}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.type = undefined;
}

/**
 * A per-vertex or per-instance attribute.
 *
 * @alias ModelComponents.Attribute
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function Attribute() {
  /**
   * The attribute semantic. The following semantics have defined behavior:
   * <ul>
   *   <li>POSITION: per-vertex position</li>
   *   <li>NORMAL: per-vertex normal</li>
   *   <li>TANGENT: per-vertex tangent</li>
   *   <li>TEXCOORD_0: per-vertex texture coordinates (first set)</li>
   *   <li>TEXCOORD_1: per-vertex texture coordinates (second set)</li>
   *   <li>COLOR_0: per-vertex colors</li>
   *   <li>JOINTS_0: per-vertex joint IDs for skinning</li>
   *   <li>WEIGHTS_0: per-vertex joint weights for skinning</li>
   *   <li>_FEATURE_ID_0: per-vertex or per-instance feature IDs (first set)</li>
   *   <li>_FEATURE_ID_1: per-vertex or per-instance feature IDs (second set)</li>
   *   <li>TRANSLATION: per-instance translation</li>
   *   <li>ROTATION: per-instance rotation</li>
   *   <li>SCALE: per-instance scale</li>
   * </ul>
   *
   * @type {String}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.semantic = undefined;

  /**
   * The component data type of the attribute, e.g. ComponentDatatype.FLOAT.
   *
   * @type {ComponentDatatype}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.componentDatatype = undefined;

  /**
   * The type of the attribute, e.g. AttributeType.VEC3.
   *
   * @type {AttributeType}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.type = undefined;

  /**
   * Whether the attribute is normalized.
   *
   * @type {Boolean}
   * @default false
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.normalized = false;

  /**
   * The number of elements.
   *
   * @type {Number}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.count = undefined;

  /**
   * Minimum value of each component in the attribute.
   *
   * @type {Number|Cartesian2|Cartesian3|Cartesian4|Matrix2|Matrix3|Matrix4}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.min = undefined;

  /**
   * Maximum value of each component in the attribute.
   *
   * @type {Number|Cartesian2|Cartesian3|Cartesian4|Matrix2|Matrix3|Matrix4}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.max = undefined;

  /**
   * A constant value used for all elements when typed array and buffer are undefined.
   *
   * @type {Number|Cartesian2|Cartesian3|Cartesian4|Matrix2|Matrix3|Matrix4}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.constant = undefined;

  /**
   * Information about the quantized attribute.
   *
   * @type {ModelComponents.Quantization}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.quantization = undefined;

  /**
   * A typed array containing tightly-packed attribute values.
   *
   * @type {Uint8Array|Int8Array|Uint16Array|Int16Array|Uint32Array|Int32Array|Float32Array}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.typedArray = undefined;

  /**
   * A vertex buffer containing attribute values. Attribute values are accessed using byteOffset and byteStride.
   *
   * @type {Buffer}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.buffer = undefined;

  /**
   * The byte offset of elements in the buffer.
   *
   * @type {Number}
   * @default 0
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.byteOffset = 0;

  /**
   * The byte stride of elements in the buffer. When undefined the elements are tightly packed.
   *
   * @type {Number}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.byteStride = undefined;
}

/**
 * Indices used to select vertices for rendering.
 *
 * @alias ModelComponents.Indices
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function Indices() {
  /**
   * The index data type of the attribute, e.g. IndexDatatype.UNSIGNED_SHORT.
   *
   * @type {IndexDatatype}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.indexDatatype = undefined;

  /**
   * The number of indices.
   *
   * @type {Number}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.count = undefined;

  /**
   * An index buffer containing indices.
   *
   * @type {Buffer}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.buffer = undefined;
}

/**
 * Maps per-vertex or per-instance feature IDs to a feature table. Feature IDs
 * may be stored in an attribute or implicitly defined by a constant and stride.
 *
 * @alias ModelComponents.FeatureIdAttribute
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function FeatureIdAttribute() {
  /**
   * The ID of the feature table that feature IDs index into.
   *
   * @type {String}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.featureTableId = undefined;

  /**
   * The semantic of the attribute containing feature IDs, e.g. "_FEATURE_ID_0".
   *
   * @type {String}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.semantic = undefined;

  /**
   * A constant feature ID to use when semantic is undefined.
   *
   * @type {Number}
   * @default 0
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.constant = 0;

  /**
   * The rate at which feature IDs increment when semantic is undefined.
   *
   * @type {Number}
   * @default 0
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.divisor = 0;
}

/**
 * A texture that contains per-texel feature IDs that index into a feature table.
 *
 * @alias ModelComponents.FeatureIdTexture
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function FeatureIdTexture() {
  /**
   * The ID of the feature table that feature IDs index into.
   *
   * @type {String}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.featureTableId = undefined;

  /**
   * The texture channel containing feature IDs, may be "r", "g", "b", or "a".
   *
   * @type {String}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.channel = undefined;

  /**
   * The texture containing feature IDs.
   *
   * @type {ModelComponents.Texture}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.texture = undefined;
}

/**
 * A morph target where each attribute contains attribute displacement data.
 *
 * @alias ModelComponents.MorphTarget
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function MorphTarget() {
  /**
   * Attributes that are part of the morph target, e.g. positions, normals, and tangents.
   *
   * @type {ModelComponents.Attribute[]}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.attributes = [];
}

/**
 * Geometry to be rendered with a material.
 *
 * @alias ModelComponents.Primitive
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function Primitive() {
  /**
   * The vertex attributes, e.g. positions, normals, etc.
   *
   * @type {ModelComponents.Attribute[]}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.attributes = [];

  /**
   * The morph targets.
   *
   * @type {ModelComponents.MorphTarget[]}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.morphTargets = [];

  /**
   * An array of weights to be applied to morph targets.
   *
   * @type {Number[]}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.morphWeights = [];

  /**
   * The indices.
   *
   * @type {ModelComponents.Indices}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.indices = undefined;

  /**
   * The material.
   *
   * @type {ModelComponents.Material}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.material = undefined;

  /**
   * The primitive type, e.g. PrimitiveType.TRIANGLES.
   *
   * @type {PrimitiveType}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.primitiveType = undefined;

  /**
   * The feature ID attributes.
   *
   * @type {ModelComponents.FeatureIdAttribute[]}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.featureIdAttributes = [];

  /**
   * The feature ID textures.
   *
   * @type {ModelComponents.FeatureIdTexture[]}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.featureIdTextures = [];

  /**
   * The feature texture IDs.
   *
   * @type {String[]}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.featureTextureIds = [];
}

/**
 * Position and metadata information for instances of a node.
 *
 * @alias ModelComponents.Primitive
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function Instances() {
  /**
   * The instance attributes, e.g. translation, rotation, scale, feature id, etc.
   *
   * @type {ModelComponents.Attribute[]}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.attributes = [];

  /**
   * The feature ID attributes.
   *
   * @type {ModelComponents.FeatureIdAttribute[]}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.featureIdAttributes = [];
}

/**
 * Joints and matrices defining a skin.
 *
 * @alias ModelComponents.Skin
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function Skin() {
  /**
   * The joints.
   *
   * @type {ModelComponents.Node[]}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.joints = undefined;

  /**
   * The inverse bind matrices of the joints.
   *
   * @type {Matrix4[]}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.inverseBindMatrices = undefined;
}

/**
 * A node in the node hierarchy.
 *
 * @alias ModelComponents.Node
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function Node() {
  /**
   * The children nodes.
   *
   * @type {ModelComponents.Node[]}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.children = [];

  /**
   * The mesh primitives.
   *
   * @type {ModelComponents.Primitive[]}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.primitives = [];

  /**
   * Instances of this node.
   *
   * @type {ModelComponents.Instances}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.instances = undefined;

  /**
   * The skin.
   *
   * @type {ModelComponents.Skin}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.skin = undefined;

  /**
   * The local transformation matrix. When matrix is defined translation,
   * rotation, and scale must be undefined. When matrix is undefined
   * translation, rotation, and scale must all be defined.
   *
   * @type {Matrix4}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.matrix = undefined;

  /**
   * The local translation.
   *
   * @type {Cartesian3}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.translation = undefined;

  /**
   * The local rotation.
   *
   * @type {Quaternion}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.rotation = undefined;

  /**
   * The local scale.
   *
   * @type {Cartesian3}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.scale = undefined;
}

/**
 * A scene containing nodes.
 *
 * @alias ModelComponents.Scene
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function Scene() {
  /**
   * The nodes belonging to the scene.
   *
   * @type {ModelComponents.Node[]}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.nodes = [];
}

/**
 * The components that make up a model.
 *
 * @alias ModelComponents.Components
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function Components() {
  /**
   * The default scene.
   *
   * @type {ModelComponents.Scene}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.scene = undefined;

  /**
   * All nodes in the model.
   *
   * @type {ModelComponents.Node[]}
   */
  this.nodes = undefined;

  /**
   * Feature metadata containing the schema, feature tables, and feature textures.
   *
   * @type {FeatureMetadata}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.featureMetadata = undefined;
}

/**
 * A texture.
 *
 * @alias ModelComponents.Texture
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function Texture() {
  /**
   * The underlying GPU texture.
   *
   * @type {Texture}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.texture = undefined;

  /**
   * The texture coordinate set.
   *
   * @type {Number}
   * @default 0
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.texCoord = 0;

  /**
   * The sampler.
   *
   * @type {Sampler}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.sampler = undefined;
}

/**
 * Material properties for the PBR metallic roughness shading model.
 *
 * @alias ModelComponents.MetallicRoughness
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function MetallicRoughness() {
  /**
   * The base color texture.
   *
   * @type {ModelComponents.Texture}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.baseColorTexture = undefined;

  /**
   * The metallic roughness texture.
   *
   * @type {ModelComponents.Texture}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.metallicRoughnessTexture = undefined;

  /**
   * The base color factor.
   *
   * @type {Cartesian4}
   * @default new Cartesian4(1.0, 1.0, 1.0, 1.0)
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.baseColorFactor = new Cartesian4(1.0, 1.0, 1.0, 1.0);

  /**
   * The metallic factor.
   *
   * @type {Number}
   * @default 1.0
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.metallicFactor = 1.0;

  /**
   * The roughness factor.
   *
   * @type {Number}
   * @default 1.0
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.roughnessFactor = 1.0;
}

/**
 * Material properties for the PBR specular glossiness shading model.
 *
 * @alias ModelComponents.function SpecularGlossiness
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function SpecularGlossiness() {
  /**
   * The diffuse texture.
   *
   * @type {ModelComponents.Texture}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.diffuseTexture = undefined;

  /**
   * The specular glossiness texture.
   *
   * @type {ModelComponents.Texture}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.specularGlossinessTexture = undefined;

  /**
   * The diffuse factor.
   *
   * @type {Cartesian4}
   * @default new Cartesian4(1.0, 1.0, 1.0, 1.0)
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.diffuseFactor = new Cartesian4(1.0, 1.0, 1.0, 1.0);

  /**
   * The specular factor.
   *
   * @type {Cartesian3}
   * @default new Cartesian3(1.0, 1.0, 1.0, 1.0)
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.specularFactor = new Cartesian3(1.0, 1.0, 1.0);

  /**
   * The glossiness factor.
   *
   * @type {Number}
   * @default 1.0
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.glossinessFactor = 1.0;
}

/**
 * The material appearance of a primitive.
 *
 * @alias ModelComponent.Material
 * @constructor
 *
 * @private
 * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
 */
function Material() {
  /**
   * Material properties for the PBR metallic roughness shading model.
   *
   * @type {ModelComponents.MetallicRoughness}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.metallicRoughness = undefined;

  /**
   * Material properties for the PBR specular glossiness shading model.
   *
   * @type {ModelComponents.SpecularGlossiness}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.specularGlossiness = undefined;

  /**
   * The emissive texture.
   *
   * @type {ModelComponents.Texture}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.emissiveTexture = undefined;

  /**
   * The normal texture.
   *
   * @type {ModelComponents.Texture}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.normalTexture = undefined;

  /**
   * The occlusion texture.
   *
   * @type {ModelComponents.Texture}
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.occlusionTexture = undefined;

  /**
   * The emissive factor.
   *
   * @type {Cartesian3}
   * @default Cartesian3.ZERO
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.emissiveFactor = new Cartesian3(0.0, 0.0, 0.0);

  /**
   * The alpha mode.
   *
   * @type {AlphaMode}
   * @default AlphaMode.OPAQUE
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.alphaMode = AlphaMode.OPAQUE;

  /**
   * The alpha cutoff value of the material for the MASK alpha mode.
   *
   * @type {Number}
   * @default 0.5
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.alphaCutoff = 0.5;

  /**
   * Specifies whether the material is double sided.
   *
   * @type {Boolean}
   * @default false
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.doubleSided = false;

  /**
   * Specifies whether the material is unlit.
   *
   * @type {Boolean}
   * @default false
   * @private
   * @experimental This feature is using part of the 3D Tiles spec that is not final and is subject to change without Cesium's standard deprecation policy.
   */
  this.unlit = false;
}

ModelComponents.Quantization = Quantization;
ModelComponents.Attribute = Attribute;
ModelComponents.Indices = Indices;
ModelComponents.FeatureIdAttribute = FeatureIdAttribute;
ModelComponents.FeatureIdTexture = FeatureIdTexture;
ModelComponents.MorphTarget = MorphTarget;
ModelComponents.Primitive = Primitive;
ModelComponents.Instances = Instances;
ModelComponents.Skin = Skin;
ModelComponents.Node = Node;
ModelComponents.Scene = Scene;
ModelComponents.Components = Components;
ModelComponents.Texture = Texture;
ModelComponents.MetallicRoughness = MetallicRoughness;
ModelComponents.SpecularGlossiness = SpecularGlossiness;
ModelComponents.Material = Material;

export default ModelComponents;
