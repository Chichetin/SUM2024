import mat4 from "../../mth/mat4";
import vec3 from "../../mth/vec3";

class _vertex {
  constructor(pos, norm) {
    if (norm == undefined) this.norm = vec3();
    else this.norm = norm;

    this.pos = pos;
  }
}

export function vertex(pos, norm) {
  return new _vertex(pos, norm);
}

export function autoNormals(_vertexes, _indexes) {
  let vertexes = _vertexes,
    indexes = _indexes;

  for (let i in vertexes) vertexes[i].norm = vec3();

  for (let i = 0; i < indexes.length; i += 3) {
    let n0 = indexes[i],
      n1 = indexes[i + 1],
      n2 = indexes[i + 2];
    let p0 = vertexes[n0].pos,
      p1 = vertexes[n1].pos,
      p2 = vertexes[n2].pos,
      N = p1.sub(p0).cross(p2.sub(p0)).normalize();

    vertexes[n0].norm = vertexes[n0].norm.add(N);
    vertexes[n1].norm = vertexes[n1].norm.add(N);
    vertexes[n2].norm = vertexes[n2].norm.add(N);
  }

  for (let i in vertexes) {
    vertexes[i].norm = vertexes[i].norm.normalize();
  }

  return { vert: vertexes, inds: indexes };
}

class _prim {
  _init(shd, vertexes, indexes) {
    let trimesh = [],
      i = 0;

    this.shd = shd;
    this.verts = vertexes;
    this.inds = indexes;
    this.loaded = true;

    let a = autoNormals(this.verts, this.inds);
    this.verts = a.vert;
    this.inds = a.inds;

    for (let v of vertexes) {
      trimesh[i++] = v.pos.x;
      trimesh[i++] = v.pos.y;
      trimesh[i++] = v.pos.z;
      trimesh[i++] = v.norm.x;
      trimesh[i++] = v.norm.y;
      trimesh[i++] = v.norm.z;
    }

    this.vertexArrayId = shd.rnd.gl.createVertexArray();
    shd.rnd.gl.bindVertexArray(this.vertexArrayId);
    this.vertexBuffer = shd.rnd.gl.createBuffer();

    shd.rnd.gl.bindBuffer(shd.rnd.gl.ARRAY_BUFFER, this.vertexBuffer);
    shd.rnd.gl.bufferData(
      shd.rnd.gl.ARRAY_BUFFER,
      new Float32Array(trimesh),
      shd.rnd.gl.STATIC_DRAW,
    );

    if (shd.prg == null) this.loaded = false;
    if (
      shd.attrs["InPosition"] != undefined &&
      shd.attrs["InNormal"] != undefined
    ) {
      shd.rnd.gl.vertexAttribPointer(
        shd.attrs["InPosition"].loc,
        3,
        shd.rnd.gl.FLOAT,
        false,
        24,
        0,
      );
      shd.rnd.gl.enableVertexAttribArray(shd.attrs["InPosition"].loc);
      shd.rnd.gl.vertexAttribPointer(
        shd.attrs["InNormal"].loc,
        3,
        shd.rnd.gl.FLOAT,
        false,
        24,
        12,
      );
      shd.rnd.gl.enableVertexAttribArray(shd.attrs["InNormal"].loc);
    }

    this.IndexBufferId = shd.rnd.gl.createBuffer();
    shd.rnd.gl.bindBuffer(shd.rnd.gl.ELEMENT_ARRAY_BUFFER, this.IndexBufferId);
    shd.rnd.gl.bufferData(
      shd.rnd.gl.ELEMENT_ARRAY_BUFFER,
      new Uint32Array(indexes),
      shd.rnd.gl.STATIC_DRAW,
    );

    this.numOfElements = indexes.length;

    this.world = mat4();
  }
  constructor(shd, vertexes, indexes) {
    this._init(shd, vertexes, indexes);
  }

  draw() {
    if (this.shd.prg != null && !this.loaded)
      this._init(this.shd, this.verts, this.inds), (this.loaded = true);
    if (!this.loaded) return;

    /*
    let wvpLoc = this.shd.rnd.gl.getUniformLocation(this.shd.prg, "MatWVP"),
      wLoc = this.shd.rnd.gl.getUniformLocation(this.shd.prg, "MatW");

    this.shd.rnd.gl.uniformMatrix4fv(
      wvpLoc,
      [].concat(...this.world.mul(this.shd.rnd.camera.matVP).m)
    );
    this.shd.rnd.gl.uniformMatrix4fv(wLoc, [].concat(...this.world.m));
    */

    if (this.shd.uniformBlocks["Prim"] != undefined)
      this.shd.uniformBlocks["Prim"].update(
        0,
        new Float32Array(
          []
            .concat(...this.world.mul(this.shd.rnd.camera.matVP).m)
            .concat(...this.world.m),
        ),
      );

    this.shd.rnd.gl.bindVertexArray(this.vertexArrayId);
    this.shd.rnd.gl.bindBuffer(
      this.shd.rnd.gl.ELEMENT_ARRAY_BUFFER,
      this.IndexBufferId,
    );
    this.shd.rnd.gl.drawElements(
      this.shd.rnd.gl.TRIANGLES,
      this.numOfElements,
      this.shd.rnd.gl.UNSIGNED_INT,
      0,
    );
  }
}

export function prim(shader, vertexes, indexes) {
  return new _prim(shader, vertexes, indexes);
}
