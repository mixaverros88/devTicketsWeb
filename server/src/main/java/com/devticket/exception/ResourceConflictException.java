package com.devticket.exception;

public class ResourceConflictException extends RuntimeException {
  /**
   * Created by CodingFive Team  2018
   * (Dimou John - Mike Verros (Back-End))
   */

  private static final long serialVersionUID = 1791564636123821405L;
  private Long resourceId;

  public ResourceConflictException(Long resourceId, String message) {
    super(message);
    this.setResourceId(resourceId);
  }

  public Long getResourceId() {
    return resourceId;
  }

  public void setResourceId(Long resourceId) {
    this.resourceId = resourceId;
  }
}
