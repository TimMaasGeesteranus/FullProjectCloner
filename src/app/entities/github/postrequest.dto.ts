export class PostrequestDto {
  private readonly name: string;
  private readonly description: string;
  private readonly homepage: string;
  private readonly is_private: boolean;
  private readonly has_issues: boolean;
  private readonly has_projects: boolean;
  private readonly has_wiki: boolean;

  constructor(name: string, description: string, homepage:
    string , is_private: boolean, has_issues: boolean, has_projects: boolean, has_wiki: boolean) {
    this.name = name;
    this.description = description;
    this.homepage = homepage;
    this.is_private = is_private;
    this.has_issues = has_issues;
    this.has_projects = has_projects;
    this.has_wiki = has_wiki;
  }
}
